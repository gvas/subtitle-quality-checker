import { types } from '../actions/index'

const initialState = {
  value: 40,
  isEdited: false,
  editedValue: '40',
  errorText: null,
}

function validate(value) {
  if (!value.length) {
    return 'Kötelező'
  }

  const valueAsNumber = parseInt(value, 10)
  if (isNaN(valueAsNumber) || valueAsNumber.toString() !== value || valueAsNumber < 1) {
    return 'Pozitív egész szám'
  }

  return null
}

export default function maxRowLength(state = initialState, action) {
  switch (action.type) {
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
      const errorText = validate(state.editor.value)
      return errorText === null
        ? {
            ...state,
            value: parseInt(state.editedValue, 10),
            isEdited: false,
            errorText: null,
          }
        : {
            ...state,
            errorText: errorText,
        }
    }
    default:
      return state
  }
}
