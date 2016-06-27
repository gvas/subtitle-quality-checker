import types from '../constants/actionTypes'

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

const setSettingValue = (name, value) => ({
  type: types.SET_SETTING_VALUE,
  payload: {
    name,
    value,
  },
})

const setSettingValidationError = (name, validationError) => ({
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

    if (validationError === null) {
      dispatch(persistValue(name, value))
      dispatch(setSettingValue(name, value))
    } else {
      dispatch(setSettingValidationError(name, validationError))
    }
  }

const persistValue = (key, value) => ({
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
