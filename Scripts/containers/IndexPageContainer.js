import { connect } from 'react-redux'
import { readSubtitleAsync } from '../actions/index'
import IndexPage from '../components/IndexPage'
import { getTables, getScore } from '../selectors'

const mapStateToProps = (state) => ({
  greaterThanSmall: state.browser.greaterThan.small,
  file: state.appSpecific.file,
  subtitlesLoaded: !!getTables(state),
  score: getScore(state),
  encoding: state.settings.encoding.value,
})

const mapDispatchToProps = {
  readSubtitleAsync,
}

const IndexPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage)

export default IndexPageContainer
