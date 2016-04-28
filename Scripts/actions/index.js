/*global window*/
import { CALCULATE_RESPONSIVE_STATE } from 'redux-responsive'
import { readFile } from '../utils/fileUtils'

export const types = {
  OPEN_NAVIGATION_DRAWER: 'OPEN_NAVIGATION_DRAWER',
  CLOSE_NAVIGATION_DRAWER: 'CLOSE_NAVIGATION_DRAWER',
  READ_SUBTITLE: 'READ_SUBTITLE',
  READ_SUBTITLE_COMPLETED: 'READ_SUBTITLE_COMPLETED',
  READ_SUBTITLE_FAILED: 'READ_SUBTITLE_FAILED',
  DELETE_SNACK: 'DELETE_SNACK',
  OPEN_ENCODING_EDITOR: 'OPEN_ENCODING_EDITOR',
  CHANGE_ENCODING: 'CHANGE_ENCODING',
  ROLLBACK_ENCODING: 'ROLLBACK_ENCODING',
  SUBMIT_ENCODING: 'SUBMIT_ENCODING',
  OPEN_MAX_ROW_COUNT_EDITOR: 'OPEN_MAX_ROW_COUNT_EDITOR',
  CHANGE_MAX_ROW_COUNT: 'CHANGE_MAX_ROW_COUNT',
  ROLLBACK_MAX_ROW_COUNT: 'ROLLBACK_MAX_ROW_COUNT',
  SUBMIT_MAX_ROW_COUNT: 'SUBMIT_MAX_ROW_COUNT',
  OPEN_MAX_CHAR_COUNT_EDITOR: 'OPEN_MAX_CHAR_COUNT_EDITOR',
  CHANGE_MAX_CHAR_COUNT: 'CHANGE_MAX_CHAR_COUNT',
  ROLLBACK_MAX_CHAR_COUNT: 'ROLLBACK_MAX_CHAR_COUNT',
  SUBMIT_MAX_CHAR_COUNT: 'SUBMIT_MAX_CHAR_COUNT',
  OPEN_MAX_DURATION_MS_EDITOR: 'OPEN_MAX_DURATION_MS_EDITOR',
  CHANGE_MAX_DURATION_MS: 'CHANGE_MAX_DURATION_MS',
  ROLLBACK_MAX_DURATION_MS: 'ROLLBACK_MAX_DURATION_MS',
  SUBMIT_MAX_DURATION_MS: 'SUBMIT_MAX_DURATION_MS',
  OPEN_MAX_PAUSE_MS_EDITOR: 'OPEN_MAX_PAUSE_MS_EDITOR',
  CHANGE_MAX_PAUSE_MS: 'CHANGE_MAX_PAUSE_MS',
  ROLLBACK_MAX_PAUSE_MS: 'ROLLBACK_MAX_PAUSE_MS',
  SUBMIT_MAX_PAUSE_MS: 'SUBMIT_MAX_PAUSE_MS',
}

export function calculateResponsiveState() {
  const {innerWidth, innerHeight, matchMedia} = window
  return {
    type: CALCULATE_RESPONSIVE_STATE,
    innerWidth,
    innerHeight,
    matchMedia,
  }
}

export const openNavigationDrawer = () => ({
  type: types.OPEN_NAVIGATION_DRAWER,
})

export const closeNavigationDrawer = () => ({
  type: types.CLOSE_NAVIGATION_DRAWER,
})

export const readSubtitle = (file) => ({
  type: types.READ_SUBTITLE,
  payload: file,
})

export const readSubtitleCompleted = (tables) => ({
  type: types.READ_SUBTITLE_COMPLETED,
  payload: tables,
})

export const readSubtitleFailed = (reason) => ({
  type: types.READ_SUBTITLE_FAILED,
  payload: reason,
})

export const readSubtitleAsync = (file, encoding) =>
  (dispatch) => {
    dispatch(readSubtitle(file))

    return readFile(file, encoding).then(
      tables => {
        dispatch(readSubtitleCompleted(tables))
      },
      reason => {
        dispatch(readSubtitleFailed(reason))
      }
    )
  }

export const deleteSnack = () => ({
  type: types.DELETE_SNACK,
})

export const openEncodingEditor = () => ({
  type: types.OPEN_ENCODING_EDITOR,
})

export const changeEncoding = (encoding) => ({
  type: types.CHANGE_ENCODING,
  payload: encoding,
})

export const rollbackEncoding = () => ({
  type: types.ROLLBACK_ENCODING,
})

export const submitEncoding = () => ({
  type: types.SUBMIT_ENCODING,
})

export const openMaxRowCountEditor = () => ({
  type: types.OPEN_MAX_ROW_COUNT_EDITOR,
})

export const changeMaxRowCount = (maxRowCount) => ({
  type: types.CHANGE_MAX_ROW_COUNT,
  payload: maxRowCount,
})

export const rollbackMaxRowCount = () => ({
  type: types.ROLLBACK_MAX_ROW_COUNT,
})

export const submitMaxRowCount = () => ({
  type: types.SUBMIT_MAX_ROW_COUNT,
})

export const openMaxCharCountEditor = () => ({
  type: types.OPEN_MAX_CHAR_COUNT_EDITOR,
})

export const changeMaxCharCount = (maxCharCount) => ({
  type: types.CHANGE_MAX_CHAR_COUNT,
  payload: maxCharCount,
})

export const rollbackMaxCharCount = () => ({
  type: types.ROLLBACK_MAX_CHAR_COUNT,
})

export const submitMaxCharCount = () => ({
  type: types.SUBMIT_MAX_CHAR_COUNT,
})

export const openMaxDurationMsEditor = () => ({
  type: types.OPEN_MAX_DURATION_MS_EDITOR,
})

export const changeMaxDurationMs = (maxDurationMs) => ({
  type: types.CHANGE_MAX_DURATION_MS,
  payload: maxDurationMs,
})

export const rollbackMaxDurationMs = () => ({
  type: types.ROLLBACK_MAX_DURATION_MS,
})

export const submitMaxDurationMs = () => ({
  type: types.SUBMIT_MAX_DURATION_MS,
})

export const openMaxPauseMsEditor = () => ({
  type: types.OPEN_MAX_PAUSE_MS_EDITOR,
})

export const changeMaxPauseMs = (maxPauseMs) => ({
  type: types.CHANGE_MAX_PAUSE_MS,
  payload: maxPauseMs,
})

export const rollbackMaxPauseMs = () => ({
  type: types.ROLLBACK_MAX_PAUSE_MS,
})

export const submitMaxPauseMs = () => ({
  type: types.SUBMIT_MAX_PAUSE_MS,
})
