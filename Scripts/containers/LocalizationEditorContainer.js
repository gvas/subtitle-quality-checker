import { connect } from 'react-redux'
import { changeLocalization, rollbackLocalization, submitLocalization } from '../actions/index'
import SelectSettingEditor from '../components/SelectSettingEditor'
import locales from '../constants/locales'

const mapStateToProps = (state) => ({
  translations: state.settings.localization.translations,
  isOpen: state.settings.localization.isEdited,
  value: state.settings.localization.editedValue,
  choices: locales.map(locale => ({
    label: state.settings.localization.translations.translate(locale, { scope: 'app.locales' }),
    value: locale,
  })),
})

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
