/*eslint-env node, browser*/
import { types } from '../actions/index'
import validationErrorTypes from '../constants/validationErrorTypes'

const initialState = {
  value: 40,
  isEdited: false,
  editedValue: '40',
  validationError: null,
}

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

export default function maxRowLength(state = initialState, action) {
  switch (action.type) {
    case types.RESTORE_SETTINGS: {
      const restored = localStorage.getItem('maxRowLength')
      if (!restored || validate(restored) !== null) {
        return state
      } else {
        return {
          ...state,
          value: parseInt(restored, 10),
        }
      }
    }
    case types.OPEN_MAX_ROW_LENGTH_EDITOR:
      return {
        ...state,
        isEdited: true,
        editedValue: state.value.toString(),
      }
    case types.CHANGE_MAX_ROW_LENGTH:
      return {
        ...state,
        editedValue: action.payload,
      }
    case types.ROLLBACK_MAX_ROW_LENGTH:
      return {
        ...state,
        isEdited: false,
        editedValue: state.value.toString(),
      }
    case types.SUBMIT_MAX_ROW_LENGTH: {
      const validationError = validate(state.editedValue)
      if (validationError === null) {
        localStorage.setItem('maxRowLength', state.editedValue)
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
