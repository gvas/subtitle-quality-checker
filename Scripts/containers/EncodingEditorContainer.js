import { connect } from 'react-redux'
import { changeSetting, rollbackSetting, submitSetting } from '../actions/index'
import { parseSubtitleAsync, evaluateTablesAsync } from '../actions/subtitle'
import EncodingEditor from '../components/EncodingEditor'
import { getTranslations } from '../selectors/index'
import encodings from '../constants/encodings'

const submitEncoding = (encoding, fileContent, settings) =>
  dispatch => {
    dispatch(submitSetting('encoding', encoding))
    if (fileContent !== null) {
      dispatch(parseSubtitleAsync(encoding, fileContent))
        .then(tables => dispatch(evaluateTablesAsync(settings, tables)))
    }
  }

const mapStateToProps = state => {
  const t = getTranslations(state)
  const setting = state.settings.encoding
  return {
    name: 'encoding',
    translations: t,
    fileContent: state.subtitle.fileContent,
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
    isOpen: setting.isEdited,
    value: setting.editedValue,
    choices: encodings.map(encoding => ({
      label: t.translate(encoding, { scope: 'app.encodings' }),
      value: encoding,
    })),
  }
}

const mapDispatchToProps = {
  changeSetting,
  rollbackSetting,
  submitSetting: submitEncoding,
}

const EncodingEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncodingEditor)

export default EncodingEditorContainer
