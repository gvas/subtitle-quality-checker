import { connect } from 'react-redux'
import { changeMinPauseMs, rollbackMinPauseMs, submitMinPauseMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.minPauseMs
  return {
    label: t.translate('app.settingsPage.minPauseMs'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinPauseMs,
  onRollback: rollbackMinPauseMs,
  onSubmit: submitMinPauseMs,
}

const MinPauseMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinPauseMsEditorContainer
