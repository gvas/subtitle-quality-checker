import { connect } from 'react-redux'
import { changeMaxRowCount, rollbackMaxRowCount, submitMaxRowCount } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
  const setting = state.settings.maxRowCount
  return {
    label: t.translate('app.settingsPage.maxRowCount'),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  onChange: changeMaxRowCount,
  onRollback: rollbackMaxRowCount,
  onSubmit: submitMaxRowCount,
}

const MaxRowCountEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default MaxRowCountEditorContainer
