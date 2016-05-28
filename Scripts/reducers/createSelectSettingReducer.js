/*eslint-env node, browser*/
import { types } from '../actions/index'

/**
 * Creates a reducer function for a select-type setting.
 * @params {Object} params - Object describing the actions the reducer handles,
 *   the setting's initial value, etc.
 * @params {string} params.name - The setting's name.
 * @params {string} params.initialValue - The setting's initial value.
 * @returns {function} - The setting's reducer function.
 */
export default (params) => {
  const initialState = {
    value: params.initialValue,
    isEdited: false,
    editedValue: params.initialValue,
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case types.OPEN_SETTING_EDITOR:
        return action.payload === params.name
          ? {
            ...state,
            isEdited: true,
            editedValue: state.value,
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
            editedValue: state.value,
          }
          : state
      case types.SET_SETTING_VALUE:
        return action.payload.name === params.name
          ? {
            ...state,
            value: action.payload.value,
            isEdited: false,
          }
          : state
      case types.RESTORE_VALUE:
        return action.payload.key === params.name
          ? {
            ...state,
            value: action.payload.value,
          }
          : state
      default:
        return state
    }
  }
}
