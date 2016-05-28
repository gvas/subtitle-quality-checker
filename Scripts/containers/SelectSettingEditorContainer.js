import { connect } from 'react-redux'
import { changeSetting, rollbackSetting, submitSetting } from '../actions/index'
import SelectSettingEditor from '../components/SelectSettingEditor'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state, ownProps) => {
  const t = getTranslations(state)
  const setting = state.settings[ownProps.name]
  return {
    name: ownProps.name,
    translations: t,
    isOpen: setting.isEdited,
    value: setting.editedValue,
    choices: ownProps.choices,
  }
}

const mapDispatchToProps = {
  changeSetting,
  rollbackSetting,
  submitSetting,
}

const SelectSettingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSettingEditor)

export default SelectSettingEditorContainer
