import { connect } from 'react-redux'
import { readFileAsync, parseSubtitleAsync, evaluateTablesAsync } from '../actions/index'
import FloatingActionButtonMenu from '../components/FloatingActionButtonMenu'

const readAndParseAndEvaluate = (file, settings) =>
  dispatch => {
    dispatch(readFileAsync(file))
      .then(fileContent => dispatch(parseSubtitleAsync(settings.encoding, fileContent)))
      .then(tables => dispatch(evaluateTablesAsync(settings, tables)))
  }

const mapStateToProps = (state) => ({
  file: state.subtitle.file,
  settings: {
    encoding: state.settings.encoding.value,
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
})

const mapDispatchToProps = {
  readAndParseAndEvaluate,
}

const FloatingActionButtonMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingActionButtonMenu)

export default FloatingActionButtonMenuContainer
