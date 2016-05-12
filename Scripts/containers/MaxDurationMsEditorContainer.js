import { connect } from 'react-redux'
import { changeMaxDurationMs, rollbackMaxDurationMs, submitMaxDurationMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.maxDurationMs
  return {
    label: t.translate('app.settingsPage.maxDurationMs'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxDurationMs,
  onRollback: rollbackMaxDurationMs,
  onSubmit: submitMaxDurationMs,
}

const MaxDurationMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxDurationMsEditorContainer
