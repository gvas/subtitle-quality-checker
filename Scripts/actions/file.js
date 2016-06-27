/* eslint-env browser, es6 */
import types from '../constants/actionTypes'

const readSubtitle = file => ({
  type: types.READ_SUBTITLE,
  payload: file,
})

const readSubtitleCompleted = fileContent => ({
  type: types.READ_SUBTITLE_COMPLETED,
  payload: fileContent,
})

const readSubtitleFailed = reason => ({
  type: types.READ_SUBTITLE_FAILED,
  payload: reason,
})

export const readFileAsync = file =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(readSubtitle(file))
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const fileContent = event.target.result
      dispatch(readSubtitleCompleted(fileContent))
      resolve(fileContent)
    })
    reader.addEventListener('error', (event) => {
      const reason = `${event.name}: ${event.message}`
      dispatch(readSubtitleFailed(reason))
      reject(reason)
    })
    reader.readAsArrayBuffer(file)
  })
