import { connect } from 'react-redux'
import { changeMaxPauseMs, rollbackMaxPauseMs, submitMaxPauseMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.maxPauseMs
  return {
    label: t.translate('app.settingsPage.maxPauseMs'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxPauseMs,
  onRollback: rollbackMaxPauseMs,
  onSubmit: submitMaxPauseMs,
}

const MaxPauseMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxPauseMsEditorContainer
