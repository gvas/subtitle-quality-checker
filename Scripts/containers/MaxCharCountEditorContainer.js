import { connect } from 'react-redux'
import { changeMaxCharCount, rollbackMaxCharCount, submitMaxCharCount } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
  const setting = state.settings.maxCharCount
  return {
    label: t.translate('app.settingsPage.maxCharCount'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
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
