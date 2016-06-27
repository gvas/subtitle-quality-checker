import types from '../constants/actionTypes'

const initialState = {
  isNavDrawerOpen: false,
  snack: null,
}

export default function global(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_NAVIGATION_DRAWER:
      return {
        ...state,
        isNavDrawerOpen: true,
      }
    case types.CLOSE_NAVIGATION_DRAWER:
      return {
        ...state,
        isNavDrawerOpen: false,
      }
    case types.READ_SUBTITLE_FAILED:
      return {
        ...state,
        snack: 'A feliratfájl felolvasása meghiúsult.',
      }
    case types.PARSE_SUBTITLE_FAILED:
      return {
        ...state,
        snack: 'A feliratfájl feldolgozása meghiúsult.',
      }
    case types.DELETE_SNACK:
      return {
        ...state,
        snack: null,
      }
    default:
      return state
  }
}
