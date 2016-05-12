import { types } from '../actions/index'
import validationErrorTypes from '../constants/validationErrorTypes'

const initialState = {
  value: 5000,
  isEdited: false,
  editedValue: '5000',
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

export default function maxDurationMs(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_MAX_DURATION_MS_EDITOR:
      return {
        ...state,
        isEdited: true,
        editedValue: state.value.toString(),
      }
    case types.CHANGE_MAX_DURATION_MS:
      return {
        ...state,
        editedValue: action.payload,
      }
    case types.ROLLBACK_MAX_DURATION_MS:
      return {
        ...state,
        isEdited: false,
        editedValue: state.value.toString(),
        validationError: null,
      }
    case types.SUBMIT_MAX_DURATION_MS: {
      const validationError = validate(state.editedValue)
      return validationError === null
        ? {
          ...state,
          value: parseInt(state.editedValue, 10),
          isEdited: false,
          validationError,
        }
        : {
          ...state,
          validationError,
        }
    }
    default:
      return state
  }
}
