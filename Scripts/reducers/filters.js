import { types } from '../actions/index'
import errorTypes from '../components/errorTypes'

const initialState = {
  [errorTypes.NO_PROBLEM]: true,
  [errorTypes.MERGEABLE]: true,
  [errorTypes.TOO_LONG_ROWS]: true,
  [errorTypes.TOO_MANY_CHARACTERS]: true,
  [errorTypes.TOO_MANY_ROWS]: true,
  [errorTypes.TOO_SHORT_DURATION]: true,
  [errorTypes.TOO_LONG_DURATION]: true,
  [errorTypes.TOO_LITTLE_CPS]: true,
  [errorTypes.TOO_BIG_CPS]: true,
  [errorTypes.TOO_SHORT_PAUSE]: true,
}

export default function filters(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_FILTER: {
      const newState = Object.assign({}, state)
      newState[action.payload] = !newState[action.payload]
      return newState
    }
    default:
      return state
  }
}
