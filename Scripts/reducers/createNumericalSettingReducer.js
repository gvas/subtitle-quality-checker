/*eslint-env node, browser*/
import { types } from '../actions/index'
import validationErrorTypes from '../constants/validationErrorTypes'
import Cookies from 'js-cookie'

function validate(value) {
  if (!value.length) {
    return validationErrorTypes.REQUIRED
  }

  const valueAsNumber = parseInt(value, 10)
  if (isNaN(valueAsNumber) || valueAsNumber.toString() !== value || valueAsNumber < 1) {
    return validationErrorTypes.POSITIVE_INTEGER
  }

  return null
}

/**
 * Creates a reducer function for a numerical setting.
 * @params {Object} params - Object describing the actions the reducer handles,
 *   the setting's initial value, etc.
 * @params {string} params.name - The setting's name.
 * @params {number} params.initialValue - The setting's initial value.
 * @params {string} params.actions.openEditor - The action invoked when the editor
 *   must be opened.
 * @params {string} params.actions.change - The action invoked when the setting's
 *   value is edited.
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
    validationError: null,
    editedValue: params.initialValue.toString(),
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case types.RESTORE_SETTINGS: {
        const settings = action.serializedSettings.split('|')
        const idx = settings.findIndex(el => el.startsWith(params.shortName + ':'))
        return idx >= 0
          ? {
            ...state,
            value: parseInt(settings[idx].substring((params.shortName + ':').length)),
          }
          : state
      }
      case params.actions.openEditor:
        return {
          ...state,
          isEdited: true,
          editedValue: state.value.toString(),
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
          editedValue: state.value.toString(),
          validationError: null,
        }
      case params.actions.submit: {
        const validationError = validate(state.editedValue)
        if (validationError === null) {
          const settings = (Cookies.get('settings') || '').split('|')
          const idx = settings.findIndex(el => el.startsWith(params.shortName + ':'))
          const cookieValue = [params.shortName, state.editedValue].join(':')
          if (idx >= 0) {
            settings[idx] = cookieValue
          } else {
            settings.push(cookieValue)
          }
          Cookies.set('settings', settings.join('|'))

          return {
            ...state,
            value: parseInt(state.editedValue, 10),
            isEdited: false,
            validationError,
          }
        } else {
          return {
          ...state,
            validationError,
          }
        }
      }
      default:
        return state
    }
  }
}
