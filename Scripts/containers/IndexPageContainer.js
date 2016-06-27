import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { readFileAsync, parseSubtitleAsync, evaluateTablesAsync } from '../actions/index'
import IndexPage from '../components/IndexPage'
import { getTranslations } from '../selectors/index'

const onDrop = (files, settings) =>
  dispatch => {
    dispatch(readFileAsync(files[0]))
      .then(fileContent => dispatch(parseSubtitleAsync(settings.encoding, fileContent)))
      .then(tables => dispatch(evaluateTablesAsync(settings, tables)))
      .then(() => dispatch(push('/results')))
  }

const mapStateToProps = (state) => ({
  translations: getTranslations(state),
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
  isBusy: state.subtitle.isLoading || state.subtitle.isParsing,
})

const mapDispatchToProps = {
  onDrop,
}

const IndexPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)

export default IndexPageContainer
