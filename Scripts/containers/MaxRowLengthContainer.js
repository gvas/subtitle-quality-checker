import { connect } from 'react-redux'
import { changeMaxRowLength, rollbackMaxRowLength, submitMaxRowLength } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.maxRowLength
  return {
    label: t.translate('app.settingsPage.maxRowLength'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
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
