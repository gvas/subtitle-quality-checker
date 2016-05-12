import { connect } from 'react-redux'
import { changeEncoding, rollbackEncoding, submitEncoding } from '../actions'
import encodings from '../constants/encodings'
import SelectSettingEditor from '../components/SelectSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.encoding
  return {
    translations: t,
    isOpen: setting.isEdited,
    value: setting.editedValue,
    choices: encodings.map(encoding => ({
      label: t.translate(encoding, { scope: 'app.encodings' }),
      value: encoding,
    })),
  }
}

const mapDispatchToProps = {
  onChange: changeEncoding,
  onRollback: rollbackEncoding,
  onSubmit: submitEncoding,
}

const EncodingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSettingEditor)

export default EncodingEditorContainer
