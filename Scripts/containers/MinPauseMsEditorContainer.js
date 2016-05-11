import { connect } from 'react-redux'
import { changeMinPauseMs, rollbackMinPauseMs, submitMinPauseMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Minimum szünet a felirattáblák között (ms)',
    errorText: state.settings.minPauseMs.errorText,
    isOpen: state.settings.minPauseMs.isEdited,
    value: state.settings.minPauseMs.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinPauseMs,
  onRollback: rollbackMinPauseMs,
  onSubmit: submitMinPauseMs,
}

const MinPauseMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinPauseMsEditorContainer
