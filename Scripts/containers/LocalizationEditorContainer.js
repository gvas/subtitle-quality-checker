import { connect } from 'react-redux'
import { changeLocalization, rollbackLocalization, submitLocalization } from '../actions/index'
import SelectSettingEditor from '../components/SelectSettingEditor'
import locales from '../constants/locales'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => {
  const t = getTranslations(state)
  return {
    translations: t,
    isOpen: state.settings.localization.isEdited,
    value: state.settings.localization.editedValue,
    choices: locales.map(locale => ({
      label: t.translate(locale, { scope: 'app.locales' }),
      value: locale,
    })),
  }
}

const mapDispatchToProps = {
  onChange: changeLocalization,
  onRollback: rollbackLocalization,
  onSubmit: submitLocalization,
}

const LocalizationEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSettingEditor)

export default LocalizationEditorContainer
