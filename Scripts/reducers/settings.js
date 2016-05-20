import { combineReducers } from 'redux'
import createNumericalSettingReducer from './createNumericalSettingReducer'
import createSelectSettingReducer from './createSelectSettingReducer'
import {types as actionTypes} from '../actions/index'

const settings = combineReducers({
  localization: createSelectSettingReducer({
    name: 'locale',
    shortName: 'L',
    initialValue: 'en',
    actions: {
      openEditor: actionTypes.OPEN_LOCALIZATION_EDITOR,
      change: actionTypes.CHANGE_LOCALIZATION,
      rollback: actionTypes.ROLLBACK_LOCALIZATION,
      submit: actionTypes.SUBMIT_LOCALIZATION,
    },
  }),
  encoding: createSelectSettingReducer({
    name: 'encoding',
    shortName: 'E',
    initialValue: 'utf-8',
    actions: {
      openEditor: actionTypes.OPEN_ENCODING_EDITOR,
      change: actionTypes.CHANGE_ENCODING,
      rollback: actionTypes.ROLLBACK_ENCODING,
      submit: actionTypes.SUBMIT_ENCODING,
    },
  }),
  maxRowLength: createNumericalSettingReducer({
    name: 'maxRowLength',
    shortName: 'MAXRL',
    initialValue: 40,
    actions: {
      openEditor: actionTypes.OPEN_MAX_ROW_LENGTH_EDITOR,
      change: actionTypes.CHANGE_MAX_ROW_LENGTH,
      rollback: actionTypes.ROLLBACK_MAX_ROW_LENGTH,
      submit: actionTypes.SUBMIT_MAX_ROW_LENGTH,
    },
  }),
  maxRowCount: createNumericalSettingReducer({
    name: 'maxRowCount',
    shortName: 'MAXRC',
    initialValue: 2,
    actions: {
      openEditor: actionTypes.OPEN_MAX_ROW_COUNT_EDITOR,
      change: actionTypes.CHANGE_MAX_ROW_COUNT,
      rollback: actionTypes.ROLLBACK_MAX_ROW_COUNT,
      submit: actionTypes.SUBMIT_MAX_ROW_COUNT,
    },
  }),
  maxCharCount: createNumericalSettingReducer({
    name: 'maxCharCount',
    shortName: 'MAXCC',
    initialValue: 80,
    actions: {
      openEditor: actionTypes.OPEN_MAX_CHAR_COUNT_EDITOR,
      change: actionTypes.CHANGE_MAX_CHAR_COUNT,
      rollback: actionTypes.ROLLBACK_MAX_CHAR_COUNT,
      submit: actionTypes.SUBMIT_MAX_CHAR_COUNT,
    },
  }),
  maxDurationMs: createNumericalSettingReducer({
    name: 'maxDurationMs',
    shortName: 'MAXD',
    initialValue: 5000,
    actions: {
      openEditor: actionTypes.OPEN_MAX_DURATION_MS_EDITOR,
      change: actionTypes.CHANGE_MAX_DURATION_MS,
      rollback: actionTypes.ROLLBACK_MAX_DURATION_MS,
      submit: actionTypes.SUBMIT_MAX_DURATION_MS,
    },
  }),
  maxPauseMs: createNumericalSettingReducer({
    name: 'maxPauseMs',
    shortName: 'MAXP',
    initialValue: 1000,
    actions: {
      openEditor: actionTypes.OPEN_MAX_PAUSE_MS_EDITOR,
      change: actionTypes.CHANGE_MAX_PAUSE_MS,
      rollback: actionTypes.ROLLBACK_MAX_PAUSE_MS,
      submit: actionTypes.SUBMIT_MAX_PAUSE_MS,
    },
  }),
  minCps: createNumericalSettingReducer({
    name: 'minCps',
    shortName: 'MINC',
    initialValue: 8,
    actions: {
      openEditor: actionTypes.OPEN_MIN_CPS_EDITOR,
      change: actionTypes.CHANGE_MIN_CPS,
      rollback: actionTypes.ROLLBACK_MIN_CPS,
      submit: actionTypes.SUBMIT_MIN_CPS,
    },
  }),
  maxCps: createNumericalSettingReducer({
    name: 'maxCps',
    shortName: 'MAXC',
    initialValue: 25,
    actions: {
      openEditor: actionTypes.OPEN_MAX_CPS_EDITOR,
      change: actionTypes.CHANGE_MAX_CPS,
      rollback: actionTypes.ROLLBACK_MAX_CPS,
      submit: actionTypes.SUBMIT_MAX_CPS,
    },
  }),
  minPauseMs: createNumericalSettingReducer({
    name: 'minPauseMs',
    shortName: 'MINP',
    initialValue: 30,
    actions: {
      openEditor: actionTypes.OPEN_MIN_PAUSE_MS_EDITOR,
      change: actionTypes.CHANGE_MIN_PAUSE_MS,
      rollback: actionTypes.ROLLBACK_MIN_PAUSE_MS,
      submit: actionTypes.SUBMIT_MIN_PAUSE_MS,
    },
  }),
  minDurationMs: createNumericalSettingReducer({
    name: 'minDurationMs',
    shortName: 'MIND',
    initialValue: 1000,
    actions: {
      openEditor: actionTypes.OPEN_MIN_DURATION_MS_EDITOR,
      change: actionTypes.CHANGE_MIN_DURATION_MS,
      rollback: actionTypes.ROLLBACK_MIN_DURATION_MS,
      submit: actionTypes.SUBMIT_MIN_DURATION_MS,
    },
  }),
})

export default settings
