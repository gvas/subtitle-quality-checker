/*eslint-env browser, es6 */
import types from '../constants/actionTypes'

const parseSubtitle = () => ({
  type: types.PARSE_SUBTITLE,
})

const parseSubtitleCompleted = tables => ({
  type: types.PARSE_SUBTITLE_COMPLETED,
  payload: tables,
})

const parseSubtitleFailed = reason => ({
  type: types.PARSE_SUBTITLE_FAILED,
  payload: reason,
})

const evaluateTables = () => ({
  type: types.EVALUATE_TABLES,
})

const evaluateTablesCompleted = tables => ({
  type: types.EVALUATE_TABLES_COMPLETED,
  payload: tables,
})

const evaluateTablesFailed = reason => ({
  type: types.EVALUATE_TABLES_FAILED,
  payload: reason,
})

export const parseSubtitleAsync = (encoding, fileContent) =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(parseSubtitle())
    const worker = new Worker('worker.bundle.js')
    worker.onmessage = e => {
      const { payload, error } = e.data
      if (error) {
        dispatch(parseSubtitleFailed(error))
        reject(error)
      } else {
        dispatch(parseSubtitleCompleted(payload))
        resolve(payload)
      }
    }
    worker.postMessage({
      type: 'parseSubtitle',
      payload: { fileContent, encoding },
    })
  })

export const evaluateTablesAsync = (settings, tables) =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(evaluateTables())
    const worker = new Worker('worker.bundle.js')
    worker.onmessage = e => {
      const { payload, error } = e.data
      if (error) {
        dispatch(evaluateTablesFailed(error))
        reject(error)
      } else {
        dispatch(evaluateTablesCompleted(payload))
        resolve(payload)
      }
    }
    worker.postMessage({
      type: 'evaluateTables',
      payload: { settings, tables },
    })
  })
