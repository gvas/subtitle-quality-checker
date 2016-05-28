import { combineReducers } from 'redux'
import createNumericalSettingReducer from './createNumericalSettingReducer'
import createSelectSettingReducer from './createSelectSettingReducer'

const settings = combineReducers({
  locale: createSelectSettingReducer({
    name: 'locale',
    initialValue: 'en',
  }),
  encoding: createSelectSettingReducer({
    name: 'encoding',
    initialValue: 'utf-8',
  }),
  maxRowLength: createNumericalSettingReducer({
    name: 'maxRowLength',
    initialValue: 40,
  }),
  maxRowCount: createNumericalSettingReducer({
    name: 'maxRowCount',
    initialValue: 2,
  }),
  maxCharCount: createNumericalSettingReducer({
    name: 'maxCharCount',
    initialValue: 80,
  }),
  maxDurationMs: createNumericalSettingReducer({
    name: 'maxDurationMs',
    initialValue: 5000,
  }),
  maxPauseMs: createNumericalSettingReducer({
    name: 'maxPauseMs',
    initialValue: 1000,
  }),
  minCps: createNumericalSettingReducer({
    name: 'minCps',
    initialValue: 8,
  }),
  maxCps: createNumericalSettingReducer({
    name: 'maxCps',
    initialValue: 25,
  }),
  minPauseMs: createNumericalSettingReducer({
    name: 'minPauseMs',
    initialValue: 30,
  }),
  minDurationMs: createNumericalSettingReducer({
    name: 'minDurationMs',
    initialValue: 1000,
  }),
})

export default settings
