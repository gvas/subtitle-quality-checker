import { types } from '../actions/index'

const initialState = null

export default function filter(state = initialState, action) {
  switch (action.type) {
    case types.SET_FILTER: {
      return action.payload
    }
    default:
      return state
  }
}
