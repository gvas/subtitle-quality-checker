/* eslint-env worker */
import { TextDecoder } from 'text-encoding'
import { lengthWithoutCRLF } from './utils/stringUtils'
import errorTypes from './constants/errorTypes'

const parseTime = (time) => {
  const delimiter = /:|,/
  const [hours, minutes, seconds, milliseconds] = time.split(delimiter)
  return +hours * 3600000 + +minutes * 60000 + +seconds * 1000 + +milliseconds
}

const getFileContentAsString = (fileContent, encoding) => {
  if (fileContent !== null) {
    const decoder = new TextDecoder(encoding)
    return decoder.decode(fileContent)
  }
  return null
}

const evaluateTables = (settings, tables) => {
  const result = []
  for (let i = 0; i < tables.length; i++) {
    const currentTable = tables[i]
    const nextTable = i === tables.length - 1 ? null : tables[i + 1]
    const currentTableLengthWithoutCRLF = lengthWithoutCRLF(currentTable.text)
    const nextTableLengthWithoutCRLF = i === tables.length - 1 ? null : lengthWithoutCRLF(nextTable.text)
    const currentTableDurationMs = currentTable.endTimeMs - currentTable.startTimeMs

    currentTable.errors[errorTypes.MERGEABLE] =
      (nextTable !== null &&
        currentTableLengthWithoutCRLF + nextTableLengthWithoutCRLF <= settings.maxCharCount &&
        nextTable.startTimeMs - currentTable.endTimeMs < settings.maxPauseMs &&
        nextTable.endTimeMs - currentTable.startTimeMs <= settings.maxDurationMs)

    currentTable.errors[errorTypes.TOO_LONG_ROWS] =
      (currentTable.text.split(/(?:\r\n)|\n|\r/).some(row => row.length > settings.maxRowLength))

    currentTable.errors[errorTypes.TOO_MANY_CHARACTERS] =
      (lengthWithoutCRLF(currentTable.text) > settings.maxCharCount)

    currentTable.errors[errorTypes.TOO_MANY_ROWS] =
      (currentTable.text.split(/(?:\r\n)|\n|\r/).length > settings.maxRowCount)

    currentTable.errors[errorTypes.TOO_SHORT_DURATION] =
      (currentTableDurationMs < settings.minDurationMs)

    currentTable.errors[errorTypes.TOO_LONG_DURATION] =
      (currentTableDurationMs > settings.maxDurationMs)

    currentTable.errors[errorTypes.TOO_LITTLE_CPS] =
      (currentTableLengthWithoutCRLF * 1000 / currentTableDurationMs < settings.minCps)

    currentTable.errors[errorTypes.TOO_BIG_CPS] =
      (currentTableLengthWithoutCRLF * 1000 / currentTableDurationMs > settings.maxCps)

    currentTable.errors[errorTypes.TOO_SHORT_PAUSE] =
      (nextTable !== null &&
        nextTable.startTimeMs - currentTable.endTimeMs < settings.minPauseMs)

    result.push(currentTable)
  }
  return result
}

const parseSubtitle = (fileContent, encoding) => {
  const fileContentAsString = getFileContentAsString(fileContent, encoding)
  const tables = []
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
  }
  return tables
}

onmessage = e => {
  const { type, payload } = e.data
  switch (type) {
    case 'parseSubtitle': {
      const { fileContent, encoding } = payload
      postMessage({
        payload: parseSubtitle(fileContent, encoding),
        error: null,
      })
      break
    }
    case 'evaluateTables': {
      const { settings, tables } = payload
      postMessage({
        payload: evaluateTables(settings, tables),
        error: null,
      })
      break
    }
    default: {
      postMessage({
        payload: null,
        error: 'Not implemented',
      })
      break
    }
  }
}
