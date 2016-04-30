/*global Set*/
import { createSelector } from 'reselect'
import { lengthWithoutCRLF } from '../utils/stringUtils'

const getFileContent = (state) => state.appSpecific.fileContent
const getSettings = (state) => state.settings

const parseTime = (time) => {
  const delimiter = /:|,/
  const [hours, minutes, seconds, milliseconds] = time.split(delimiter)
  return +hours * 3600000 + +minutes * 60000 + +seconds * 1000 + +milliseconds
}

export const getTables = createSelector(
  [getFileContent],
  fileContent => {
    const tables = []
    if (fileContent !== null) {
      const delimiter = /(?:\r\n|\r|\n){2}(\d+)(?:\r\n|\r|\n)(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})(?:\r\n|\r|\n)/g
      const parts = ('\n\n' + fileContent).split(delimiter)
      if (parts.length > 1) {
        for (let i = 1; i < parts.length; i += 4) {
          tables.push({
            id: +parts[i],
            startTimeMs: parseTime(parts[i + 1]),
            endTimeMs: parseTime(parts[i + 2]),
            text: parts[i + 3],
          })
        }
      }
    }
    return tables
  }
)

export const getSubtitleErrors = createSelector(
  [getSettings, getTables],
  (settings, tables) => {
    const errors = {
      mergeable: [],
      tooLong: [],
      moreThanTwoRows: [],
    }

    for (let i = 0; i < tables.length - 1; i++) {
      const currentTable = tables[i]
      const nextTable = tables[i + 1]
      if (lengthWithoutCRLF(currentTable.text) + lengthWithoutCRLF(nextTable.text) <= settings.maxCharCount.value &&
        nextTable.startTimeMs - currentTable.endTimeMs < settings.maxPauseMs.value &&
        nextTable.endTimeMs - currentTable.startTimeMs <= settings.maxDurationMs.value) {
        errors.mergeable.push(i)
      }
      if (lengthWithoutCRLF(currentTable.text) > settings.maxCharCount.value) {
        errors.tooLong.push(i)
      }
      if (currentTable.text.split(/(?:\r\n)|\n|\r/).length > settings.maxRowCount.value) {
        errors.moreThanTwoRows.push(i)
      }
    }

    return errors
  }
)

export const getBadTablesCount = createSelector(
  [getTables, getSubtitleErrors],
  (tables, errors) => {
    const set = new Set()
    for (let prop in errors) {
      errors[prop].forEach(index => {
        set.add(index)
      })
    }
    return set.size;
  }
)

export const getGoodTablesCount = createSelector(
  [getTables, getBadTablesCount],
  (tables, badTableCount) => tables.length - badTableCount
)

export const getScore = createSelector(
  [getTables, getBadTablesCount],
  (tables, badTableCount) => {
    return (tables.length !== 0)
      ? 1 - badTableCount / tables.length
      : null
  }
)
