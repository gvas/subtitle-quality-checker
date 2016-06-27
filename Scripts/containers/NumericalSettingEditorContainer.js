import { connect } from 'react-redux'
import { changeSetting, rollbackSetting, submitSetting, evaluateTablesAsync } from '../actions/index'
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

const submitEvaluationSetting = (name, value, settings, tables) =>
  dispatch => {
    dispatch(submitSetting(name, value, validate))
    const modifiedSettings = Object.assign({}, settings, {
      [name]: value,
    })
    dispatch(evaluateTablesAsync(modifiedSettings, tables))
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
    settings: {
      maxRowLength: state.settings.maxRowLength.value,
      maxRowCount: state.settings.maxRowCount.value,
      maxCharCount: state.settings.maxCharCount.value,
      maxDurationMs: state.settings.maxDurationMs.value,
      maxPauseMs: state.settings.maxPauseMs.value,
      minCps: state.settings.minCps.value,
      maxCps: state.settings.maxCps.value,
      minPauseMs: state.settings.minPauseMs.value,
      minDurationMs: state.settings.minDurationMs.value,
    },
    tables: state.subtitle.tables,
    value: setting.editedValue,
  }
}

const mapDispatchToProps = {
  changeSetting,
  rollbackSetting,
  submitSetting: submitEvaluationSetting,
}

const NumericalSettingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalSettingEditor)

export default NumericalSettingEditorContainer
