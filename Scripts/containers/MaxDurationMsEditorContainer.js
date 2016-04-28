import { connect } from 'react-redux'
import { changeMaxDurationMs, rollbackMaxDurationMs, submitMaxDurationMs } from '../actions'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Felirattáblák maximális hossza (ms)',
    errorText: state.settings.maxDurationMs.editor.errorText,
    isOpen: state.settings.maxDurationMs.editor.isOpen,
    value: state.settings.maxDurationMs.editor.value,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxDurationMs,
  onRollback: rollbackMaxDurationMs,
  onSubmit: submitMaxDurationMs,
}

const MaxDurationMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxDurationMsEditorContainer
