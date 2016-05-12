import { connect } from 'react-redux'
import { changeMaxRowLength, rollbackMaxRowLength, submitMaxRowLength } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
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
