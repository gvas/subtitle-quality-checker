import { connect } from 'react-redux'
import { changeMaxPauseMs, rollbackMaxPauseMs, submitMaxPauseMs } from '../actions'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Összevonható felirattáblák közti szünet max. hossza (ms)',
    errorText: state.settings.maxPauseMs.editor.errorText,
    isOpen: state.settings.maxPauseMs.editor.isOpen,
    value: state.settings.maxPauseMs.editor.value,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxPauseMs,
  onRollback: rollbackMaxPauseMs,
  onSubmit: submitMaxPauseMs,
}

const MaxPauseMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxPauseMsEditorContainer
