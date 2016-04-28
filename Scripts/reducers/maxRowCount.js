import { types } from '../actions/index'

const initialState = {
  value: 2,
  editor: {
    isOpen: false,
    errorText: null,
    value: '2',
  },
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

export default function maxCharCount(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_MAX_ROW_COUNT_EDITOR:
      return {
        ...state,
        editor: {
          ...state.editor,
          isOpen: true,
          errorText: null,
          value: state.value.toString(),
        },
      }
    case types.CHANGE_MAX_ROW_COUNT:
      return {
        ...state,
        editor: {
          ...state.editor,
          value: action.payload,
        },
      }
    case types.ROLLBACK_MAX_ROW_COUNT:
      return {
        ...state,
        editor: {
          ...state.editor,
          isOpen: false,
          errorText: null,
          value: state.value.toString(),
        },
      }
    case types.SUBMIT_MAX_ROW_COUNT: {
      const errorText = validate(state.editor.value)
      return errorText === null
        ? {
            ...state,
            value: parseInt(state.editor.value, 10),
            editor: {
              ...state.editor,
              isOpen: false,
              errorText: null,
            },
          }
        : {
          ...state,
          editor: {
            ...state.editor,
            errorText: errorText,
          },
        }
    }
    default:
      return state
  }
}
