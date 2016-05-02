import { combineReducers } from 'redux'
import encoding from './encoding'
import maxRowLength from './maxRowLength'
import maxRowCount from './maxRowCount'
import maxCharCount from './maxCharCount'
import maxDurationMs from './maxDurationMs'
import maxPauseMs from './maxPauseMs'

const settings = combineReducers({
  encoding,
  maxRowLength,
  maxRowCount,
  maxCharCount,
  maxDurationMs,
  maxPauseMs,
})

export default settings
