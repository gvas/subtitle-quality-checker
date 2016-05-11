import { connect } from 'react-redux'
import { changeMinCps, rollbackMinCps, submitMinCps } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Minimum CPS',
    errorText: state.settings.minCps.errorText,
    isOpen: state.settings.minCps.isEdited,
    value: state.settings.minCps.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinCps,
  onRollback: rollbackMinCps,
  onSubmit: submitMinCps,
}

const MinCpsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinCpsEditorContainer
