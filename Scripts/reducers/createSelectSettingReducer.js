/*eslint-env node, browser*/
import { types } from '../actions/index'

/**
 * Creates a reducer function for a select-type setting.
 * @params {Object} params - Object describing the actions the reducer handles,
 *   the setting's initial value, etc.
 * @params {string} params.name - The setting's name.
 * @params {string} params.initialValue - The setting's initial value.
 * @params {string} params.actions.openEditor - The action invoked when the editor
 *   must be opened.
 * @params {string} params.actions.change - The action invoked when the setting's
 *   value is changed.
 * @params {string} params.actions.rollback - The action invoked when the setting's
 *   original value must be restored and the editor must be closed.
 * @params {string} params.actions.submit - The action invoked when the setting's
 *   edited value must be submitted.
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
      case types.RESTORE_SETTINGS: {
        const restored = localStorage.getItem(params.name)
        return restored
          ? {
            ...state,
            value: restored,
          }
          : state
      }
      case params.actions.openEditor:
        return {
        ...state,
          isEdited: true,
          editedValue: state.value,
        }
      case params.actions.change:
        return {
        ...state,
          editedValue: action.payload,
        }
      case params.actions.rollback:
        return {
        ...state,
          isEdited: false,
          editedValue: state.value,
        }
      case params.actions.submit: {
        localStorage.setItem(params.name, state.editedValue)

        return {
          ...state,
          value: state.editedValue,
          isEdited: false,
        }
      }
      default:
        return state
    }
  }
}
