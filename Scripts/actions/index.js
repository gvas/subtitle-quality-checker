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
  OPEN_SETTING_EDITOR: 'OPEN_SETTING_EDITOR',
  CHANGE_SETTING: 'CHANGE_SETTING',
  ROLLBACK_SETTING: 'ROLLBACK_SETTING',
  SUBMIT_SETTING: 'SUBMIT_SETTING',
  SET_SETTING_VALUE: 'SET_SETTING_VALUE',
  SET_SETTING_VALIDATION_ERROR: 'SET_SETTING_VALIDATION_ERROR',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
  PERSIST_VALUE: 'PERSIST_VALUE',
  RESTORE_VALUES: 'RESTORE_VALUES',
  RESTORE_VALUE: 'RESTORE_VALUE',
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

export const openSettingEditor = name => ({
  type: types.OPEN_SETTING_EDITOR,
  payload: name,
})

export const changeSetting = (name, value) => ({
  type: types.CHANGE_SETTING,
  payload: {
    name,
    value,
  },
})

export const rollbackSetting = name => ({
  type: types.ROLLBACK_SETTING,
  payload: name,
})

export const setSettingValue = (name, value) => ({
  type: types.SET_SETTING_VALUE,
  payload: {
    name,
    value,
  },
})

export const setSettingValidationError = (name, validationError) => ({
  type: types.SET_SETTING_VALIDATION_ERROR,
  payload: {
    name,
    validationError,
  },
})

export const submitSetting = (name, value, validationFn) =>
  dispatch => {
    const validationError = validationFn
      ? validationFn(value)
      : null

    if (validationError === null)
    {
      dispatch(persistValue(name, value))
      dispatch(setSettingValue(name, value))
    } else {
      dispatch(setSettingValidationError(name, validationError))
    }
  }

export const toggleFilter = errorType => ({
  type: types.TOGGLE_FILTER,
  payload: errorType,
})

export const persistValue = (key, value) => ({
  type: types.PERSIST_VALUE,
  payload: {
    key: key,
    value: value,
  },
})

export const restoreValues = persistedValues => ({
  type: types.RESTORE_VALUES,
  payload: persistedValues,
})

export const restoreValue = (key, value) => ({
  type: types.RESTORE_VALUE,
  payload: {
    key: key,
    value: value,
  },
})
