import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createResponsiveStateReducer } from 'redux-responsive'
import global from './global'
import settings from './settings'
import filter from './filter'
import subtitle from './subtitle'

const rootReducer = combineReducers({
  global,
  browser: createResponsiveStateReducer({
    xsmall: 480,
    small: 960,
    medium: 1280,
    large: 1920,
  }),
  filter,
  routing: routerReducer,
  settings,
  subtitle,
})

export default rootReducer
