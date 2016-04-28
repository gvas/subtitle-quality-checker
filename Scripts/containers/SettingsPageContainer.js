import { connect } from 'react-redux'
import {
  openEncodingEditor,
  openMaxRowCountEditor,
  openMaxCharCountEditor,
  openMaxDurationMsEditor,
  openMaxPauseMsEditor,
} from '../actions'
import SettingsPage from '../components/SettingsPage'

const mapStateToProps = (state) => ({
  encoding: state.settings.encoding.value,
  maxRowCount: state.settings.maxRowCount.value,
  maxCharCount: state.settings.maxCharCount.value,
  maxDurationMs: state.settings.maxDurationMs.value,
  maxPauseMs: state.settings.maxPauseMs.value,
})

const mapDispatchToProps = {
  openEncodingEditor,
  openMaxRowCountEditor,
  openMaxCharCountEditor,
  openMaxDurationMsEditor,
  openMaxPauseMsEditor,
}

const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)

export default SettingsPageContainer
