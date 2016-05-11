import { types } from '../actions/index'

const initialState = {
  value: 8,
  isEdited: false,
  editedValue: '8',
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

export default function minCps(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_MIN_CPS_EDITOR:
      return {
        ...state,
        isEdited: true,
        editedValue: state.value.toString(),
      }
    case types.CHANGE_MIN_CPS:
      return {
        ...state,
        editedValue: action.payload,
      }
    case types.ROLLBACK_MIN_CPS:
      return {
        ...state,
        isEdited: false,
        editedValue: state.value.toString(),
      }
    case types.SUBMIT_MIN_CPS: {
      const errorText = validate(state.editedValue)
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
