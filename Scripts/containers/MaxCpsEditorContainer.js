import { connect } from 'react-redux'
import { changeMaxCps, rollbackMaxCps, submitMaxCps } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.maxCps
  return {
    label: t.translate('app.settingsPage.maxCps'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxCps,
  onRollback: rollbackMaxCps,
  onSubmit: submitMaxCps,
}

const MaxCpsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxCpsEditorContainer
