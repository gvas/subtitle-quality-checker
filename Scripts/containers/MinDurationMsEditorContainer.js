import { connect } from 'react-redux'
import { changeMinDurationMs, rollbackMinDurationMs, submitMinDurationMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Felirattáblák minimális hossza (ms)',
    errorText: state.settings.minDurationMs.errorText,
    isOpen: state.settings.minDurationMs.isEdited,
    value: state.settings.minDurationMs.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinDurationMs,
  onRollback: rollbackMinDurationMs,
  onSubmit: submitMinDurationMs,
}

const MinDurationMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinDurationMsEditorContainer
