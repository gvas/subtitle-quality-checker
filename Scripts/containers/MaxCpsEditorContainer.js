import { connect } from 'react-redux'
import { changeMaxCps, rollbackMaxCps, submitMaxCps } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Maximum CPS',
    errorText: state.settings.maxCps.errorText,
    isOpen: state.settings.maxCps.isEdited,
    value: state.settings.maxCps.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxCps,
  onRollback: rollbackMaxCps,
  onSubmit: submitMaxCps,
}

const MaxCpsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxCpsEditorContainer
