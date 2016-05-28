import { connect } from 'react-redux'
import { changeSetting, rollbackSetting, submitSetting } from '../actions/index'
import NumericalSettingEditor from '../components/NumericalSettingEditor'
import { getTranslations } from '../selectors/index'
import validationErrorTypes from '../constants/validationErrorTypes'

const validate = value => {
  if (!value.length) {
    return validationErrorTypes.REQUIRED
  }

  const valueAsNumber = parseInt(value, 10)
  if (isNaN(valueAsNumber) || valueAsNumber.toString() !== value || valueAsNumber < 1) {
    return validationErrorTypes.POSITIVE_INTEGER
  }

  return null
}

const mapStateToProps = (state, ownProps) => {
  const t = getTranslations(state)
  const setting = state.settings[ownProps.name]
  return {
    name: ownProps.name,
    translations: t,
    label: t.translate(ownProps.name, { scope: 'app.settingsPage' }),
    errorText: setting.validationError === null ? null : t.translate(setting.validationError, { scope: 'app.validationErrors' }),
    isOpen: setting.isEdited,
    value: setting.editedValue,
    validationFn: validate,
  }
}

const mapDispatchToProps = {
  changeSetting,
  rollbackSetting,
  submitSetting,
}

const NumericalSettingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default NumericalSettingEditorContainer
