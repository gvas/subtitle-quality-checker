import { connect } from 'react-redux'
import { changeMaxCharCount, rollbackMaxCharCount, submitMaxCharCount } from '../actions'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  return {
    label: 'Felirattáblák maximális hossza (karakter)',
    errorText: state.settings.maxCharCount.editor.errorText,
    isOpen: state.settings.maxCharCount.editor.isOpen,
    value: state.settings.maxCharCount.editor.value,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxCharCount,
  onRollback: rollbackMaxCharCount,
  onSubmit: submitMaxCharCount,
}

const MaxCharCountEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxCharCountEditorContainer
