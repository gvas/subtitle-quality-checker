/*eslint-env node, browser*/
import types from '../constants/actionTypes'

/**
 * Creates a reducer function for a numerical setting.
 * @params {Object} params - Object describing the actions the reducer handles,
 *   the setting's initial value, etc.
 * @params {string} params.name - The setting's name.
 * @params {number} params.initialValue - The setting's initial value.
 * @returns {function} - The setting's reducer function.
 */
export default (params) => {
  const initialState = {
    value: params.initialValue,
    isEdited: false,
    validationError: null,
    editedValue: params.initialValue.toString(),
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case types.OPEN_SETTING_EDITOR:
        return action.payload === params.name
          ? {
            ...state,
            isEdited: true,
            editedValue: state.value.toString(),
          }
          : state
      case types.CHANGE_SETTING:
        return action.payload.name === params.name
          ? {
            ...state,
            editedValue: action.payload.value,
          }
          : state
      case types.ROLLBACK_SETTING:
        return action.payload === params.name
          ? {
            ...state,
            isEdited: false,
            editedValue: state.value.toString(),
            validationError: null,
          }
          : state
      case types.SET_SETTING_VALUE:
        return action.payload.name === params.name
          ? {
            ...state,
            value: parseInt(action.payload.value, 10),
            isEdited: false,
            validationError: null,
          }
          : state
      case types.SET_SETTING_VALIDATION_ERROR:
        return action.payload.name === params.name
          ? {
            ...state,
            validationError: action.payload.validationError,
          }
          : state
      case types.RESTORE_VALUE:
        return action.payload.key === params.name
          ? {
            ...state,
            value: parseInt(action.payload.value, 10),
          }
          : state
      default:
        return state
    }
  }
}
