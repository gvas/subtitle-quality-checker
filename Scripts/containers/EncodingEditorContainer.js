import { connect } from 'react-redux'
import { changeEncoding, rollbackEncoding, submitEncoding } from '../actions'
import EncodingEditor from '../components/EncodingEditor'

const mapStateToProps = (state) => ({
  isOpen: state.settings.encoding.isEdited,
  value: state.settings.encoding.editedValue,
})

const mapDispatchToProps = {
  onChange: changeEncoding,
  onRollback: rollbackEncoding,
  onSubmit: submitEncoding,
}

const EncodingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncodingEditor)

export default EncodingEditorContainer
