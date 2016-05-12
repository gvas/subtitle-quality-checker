import { combineReducers } from 'redux'
import localization from './localization'
import encoding from './encoding'
import maxRowLength from './maxRowLength'
import maxRowCount from './maxRowCount'
import maxCharCount from './maxCharCount'
import maxDurationMs from './maxDurationMs'
import maxPauseMs from './maxPauseMs'
import minCps from './minCps'
import maxCps from './maxCps'
import minPauseMs from './minPauseMs'
import minDurationMs from './minDurationMs'

const settings = combineReducers({
  localization,
  encoding,
  maxRowLength,
  maxRowCount,
  maxCharCount,
  maxDurationMs,
  maxPauseMs,
  minCps,
  maxCps,
  minPauseMs,
  minDurationMs,
})

export default settings
