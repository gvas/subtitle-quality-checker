import { connect } from 'react-redux'
import { changeMaxDurationMs, rollbackMaxDurationMs, submitMaxDurationMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
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
