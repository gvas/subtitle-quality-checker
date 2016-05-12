/*eslint-env node, browser*/
import { types } from '../actions/index'
import encodings from '../constants/encodings'

const initialState = {
  value: 'utf-8',
  isEdited: false,
  editedValue: 'utf-8',
}

export default function encoding(state = initialState, action) {
  switch (action.type) {
    case types.RESTORE_SETTINGS: {
      const restored = localStorage.getItem('encoding')
      if (!restored || encodings.indexOf(restored) < 0) {
        return state
      } else {
        return {
          ...state,
          value: restored,
        }
      }
    }
    case types.OPEN_ENCODING_EDITOR:
      return {
        ...state,
        isEdited: true,
        editedValue: state.value,
      }
    case types.CHANGE_ENCODING:
      return {
        ...state,
        editedValue: action.payload,
      }
    case types.ROLLBACK_ENCODING:
      return {
        ...state,
        isEdited: false,
        editedValue: state.value,
      }
    case types.SUBMIT_ENCODING:
      localStorage.setItem('encoding', state.editedValue)
      return {
        ...state,
        value: state.editedValue,
        isEdited: false,
      }
    default:
      return state
  }
}
