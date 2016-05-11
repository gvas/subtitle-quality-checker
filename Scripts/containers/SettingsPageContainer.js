import { connect } from 'react-redux'
import {
  openEncodingEditor,
  openMaxRowCountEditor,
  openMaxCharCountEditor,
  openMaxDurationMsEditor,
  openMaxPauseMsEditor,
  openMinCpsEditor,
  openMaxCpsEditor,
  openMinPauseMsEditor,
  openMinDurationMsEditor,
} from '../actions'
import SettingsPage from '../components/SettingsPage'

const mapStateToProps = (state) => ({
  encoding: state.settings.encoding.value,
  maxRowCount: state.settings.maxRowCount.value,
  maxCharCount: state.settings.maxCharCount.value,
  maxDurationMs: state.settings.maxDurationMs.value,
  maxPauseMs: state.settings.maxPauseMs.value,
  minCps: state.settings.minCps.value,
  maxCps: state.settings.maxCps.value,
  minPauseMs: state.settings.minPauseMs.value,
  minDurationMs: state.settings.minDurationMs.value,
})

const mapDispatchToProps = {
  openEncodingEditor,
  openMaxRowCountEditor,
  openMaxCharCountEditor,
  openMaxDurationMsEditor,
  openMaxPauseMsEditor,
  openMinCpsEditor,
  openMaxCpsEditor,
  openMinPauseMsEditor,
  openMinDurationMsEditor,
}

const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)

export default SettingsPageContainer
