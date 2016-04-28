import { connect } from 'react-redux'
import { changeMaxRowCount, rollbackMaxRowCount, submitMaxRowCount } from '../actions'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Felirattáblák maximális hossza (karakter)',
    errorText: state.settings.maxRowCount.editor.errorText,
    isOpen: state.settings.maxRowCount.editor.isOpen,
    value: state.settings.maxRowCount.editor.value,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxRowCount,
  onRollback: rollbackMaxRowCount,
  onSubmit: submitMaxRowCount,
}

const MaxRowCountEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxRowCountEditorContainer
