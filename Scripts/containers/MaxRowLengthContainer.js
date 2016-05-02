import { connect } from 'react-redux'
import { changeMaxRowLength, rollbackMaxRowLength, submitMaxRowLength } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Sorok maximális hossza (karakter)',
    errorText: state.settings.maxRowLength.errorText,
    isOpen: state.settings.maxRowLength.isEdited,
    value: state.settings.maxRowLength.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxRowLength,
  onRollback: rollbackMaxRowLength,
  onSubmit: submitMaxRowLength,
}

const MaxRowLengthEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxRowLengthEditorContainer
