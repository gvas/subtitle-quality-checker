import { connect } from 'react-redux'
import { changeMinDurationMs, rollbackMinDurationMs, submitMinDurationMs } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
  const setting = state.settings.minDurationMs
  return {
    label: t.translate('app.settingsPage.minDurationMs'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinDurationMs,
  onRollback: rollbackMinDurationMs,
  onSubmit: submitMinDurationMs,
}

const MinDurationMsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinDurationMsEditorContainer
