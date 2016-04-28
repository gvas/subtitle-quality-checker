import { types } from '../actions/index'

const initialState = {
  value: 'utf-8',
  isEdited: false,
  editedValue: 'utf-8',
}

export default function encoding(state = initialState, action) {
  switch (action.type) {
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
    case types.SUBMIT_ENCODING: {
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
