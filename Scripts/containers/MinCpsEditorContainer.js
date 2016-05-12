import { connect } from 'react-redux'
import { changeMinCps, rollbackMinCps, submitMinCps } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'

const mapStateToProps = (state) => {
  const t = state.settings.localization.translations
  const setting = state.settings.minCps
  return {
    label: t.translate('app.settingsPage.minCps'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMinCps,
  onRollback: rollbackMinCps,
  onSubmit: submitMinCps,
}

const MinCpsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MinCpsEditorContainer
