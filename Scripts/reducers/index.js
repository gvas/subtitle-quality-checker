import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createResponsiveStateReducer } from 'redux-responsive'
import { types } from '../actions/index'
import settings from './settings'
import filters from './filters'

const initialAppSpecificState = {
  isNavDrawerOpen: false,
  file: null,
  fileContent: null,
  snack: null,
}

const appSpecific = (state = initialAppSpecificState, action) => {
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
    case types.READ_SUBTITLE:
      return {
        ...state,
        file: action.payload,
      }
    case types.READ_SUBTITLE_COMPLETED:
      return {
        ...state,
        fileContent: action.payload,
      }
    case types.READ_SUBTITLE_FAILED:
      return {
        ...state,
        snack: 'A feliratfájl felolvasása meghiúsult.',
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

const rootReducer = combineReducers({
  settings,
  filters: filters,
  appSpecific,
  routing: routerReducer,
  browser: createResponsiveStateReducer({
    xsmall: 480,
    small: 960,
    medium: 1280,
    large: 1920,
  }),
})

export default rootReducer
