/*global TextDecoder*/
import { createSelector } from 'reselect'
import counterpart from 'counterpart'
import * as locales from '../locales'
import { lengthWithoutCRLF } from '../utils/stringUtils'
import errorTypes from '../constants/errorTypes'

const getFileContent = (state) => state.appSpecific.fileContent
const getEncoding = (state) => state.settings.encoding.value
const getLocale = (state) => state.settings.localization.value
const getSettings = (state) => state.settings
const getFilters = (state) => state.filters

const parseTime = (time) => {
  const delimiter = /:|,/
  const [hours, minutes, seconds, milliseconds] = time.split(delimiter)
  return +hours * 3600000 + +minutes * 60000 + +seconds * 1000 + +milliseconds
}

const getFileContentAsString = createSelector(
  [getFileContent, getEncoding],
  (fileContent, encoding) => {
    if (fileContent !== null) {
      const decoder = new TextDecoder(encoding)
      return decoder.decode(fileContent)
    }
    return null
  }
)

const evaluateTables = (settings, tables) => {
  for (let i = 0; i < tables.length; i++) {
    const currentTable = tables[i]
    const nextTable = i === tables.length - 1 ? null : tables[i + 1]
    const currentTableLengthWithoutCRLF = lengthWithoutCRLF(currentTable.text)
    const nextTableLengthWithoutCRLF = i === tables.length - 1 ? null : lengthWithoutCRLF(nextTable.text)
    const currentTableDurationMs = currentTable.endTimeMs - currentTable.startTimeMs

    currentTable.errors[errorTypes.MERGEABLE] =
      (nextTable !== null &&
        currentTableLengthWithoutCRLF + nextTableLengthWithoutCRLF <= settings.maxCharCount.value &&
        nextTable.startTimeMs - currentTable.endTimeMs < settings.maxPauseMs.value &&
        nextTable.endTimeMs - currentTable.startTimeMs <= settings.maxDurationMs.value)

    currentTable.errors[errorTypes.TOO_LONG_ROWS] =
      (currentTable.text.split(/(?:\r\n)|\n|\r/).some(row => row.length > settings.maxRowLength.value))

    currentTable.errors[errorTypes.TOO_MANY_CHARACTERS] =
      (lengthWithoutCRLF(currentTable.text) > settings.maxCharCount.value)

    currentTable.errors[errorTypes.TOO_MANY_ROWS] =
      (currentTable.text.split(/(?:\r\n)|\n|\r/).length > settings.maxRowCount.value)

    currentTable.errors[errorTypes.TOO_SHORT_DURATION] =
      (currentTableDurationMs < settings.minDurationMs.value)

    currentTable.errors[errorTypes.TOO_LONG_DURATION] =
      (currentTableDurationMs > settings.maxDurationMs.value)

    currentTable.errors[errorTypes.TOO_LITTLE_CPS] =
      (currentTableLengthWithoutCRLF * 1000 / currentTableDurationMs < settings.minCps.value)

    currentTable.errors[errorTypes.TOO_BIG_CPS] =
      (currentTableLengthWithoutCRLF * 1000 / currentTableDurationMs > settings.maxCps.value)

    currentTable.errors[errorTypes.TOO_SHORT_PAUSE] =
      (nextTable !== null &&
        nextTable.startTimeMs - currentTable.endTimeMs < settings.minPauseMs.value)

    currentTable.errors[errorTypes.NO_PROBLEM] =
      !currentTable.errors[errorTypes.TOO_LONG_ROWS] &&
      !currentTable.errors[errorTypes.MERGEABLE] &&
      !currentTable.errors[errorTypes.TOO_MANY_CHARACTERS] &&
      !currentTable.errors[errorTypes.TOO_MANY_ROWS] &&
      !currentTable.errors[errorTypes.TOO_SHORT_DURATION] &&
      !currentTable.errors[errorTypes.TOO_LONG_DURATION] &&
      !currentTable.errors[errorTypes.TOO_LITTLE_CPS] &&
      !currentTable.errors[errorTypes.TOO_BIG_CPS] &&
      !currentTable.errors[errorTypes.TOO_SHORT_PAUSE]
  }
}

export const getTables = createSelector(
  [getSettings, getFileContentAsString],
  (settings, fileContentAsString) => {
    const tables = []
    if (fileContentAsString !== null) {
      const delimiter = /(?:\r\n|\r|\n){2}(\d+)(?:\r\n|\r|\n)(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})(?:\r\n|\r|\n)/g
      const parts = ('\n\n' + fileContentAsString).split(delimiter)
      if (parts.length > 1) {
        for (let i = 1; i < parts.length; i += 4) {
          tables.push({
            id: +parts[i],
            startTimeMs: parseTime(parts[i + 1]),
            endTimeMs: parseTime(parts[i + 2]),
            text: parts[i + 3],
            errors: {},
          })
        }
        // remove the newline characters from the end of the last table
        tables[tables.length - 1].text = tables[tables.length - 1].text.replace(/(?:\r\n|\r|\n)*$/, '')

        evaluateTables(settings, tables)
      }
    }
    return tables
  }
)

export const getFilteredTables = createSelector(
  [getFilters, getTables],
  (filters, tables) => {
    const checkedErrorTypes = []
    for (let errorType in filters) {
      if (filters[errorType]) {
        checkedErrorTypes.push(errorType)
      }
    }
    return tables.filter(table => checkedErrorTypes.some(errorType => table.errors[errorType]))
  }
)

export const getSubtitleErrors = createSelector(
  [getTables],
  tables => {
    const errors = {}

    for (let errorType in errorTypes) {
      errors[errorType] = 0
    }

    for (let i = 0; i < tables.length; i++) {
      for (let errorType in errorTypes) {
        if (tables[i].errors[errorType]) {
          errors[errorType] += 1
        }
      }
    }

    return errors
  }
)

export const getGoodTablesCount = createSelector(
  [getSubtitleErrors],
  errors => errors[errorTypes.NO_PROBLEM]
)

export const getBadTablesCount = createSelector(
  [getTables, getGoodTablesCount],
  (tables, goodTableCount) => tables.length - goodTableCount
)

export const getScore = createSelector(
  [getTables, getBadTablesCount],
  (tables, badTableCount) => {
    return (tables.length !== 0)
      ? 1 - badTableCount / tables.length
      : null
  }
)

export const getTranslations = createSelector(
  [getLocale],
  locale => {
    const translations = new counterpart.Instance()
    translations.registerTranslations(locale, locales[locale])
    translations.setLocale(locale)
    return translations
  }
)
