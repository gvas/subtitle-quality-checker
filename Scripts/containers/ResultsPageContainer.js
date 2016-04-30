import { connect } from 'react-redux'
import { readSubtitleAsync } from '../actions/index'
import ResultsPage from '../components/ResultsPage'
import { getTables } from '../selectors'

const mapStateToProps = (state) => ({
  greaterThanSmall: state.browser.greaterThan.small,
  hasResults: getTables(state).length !== 0,
})

const mapDispatchToProps = {
  readSubtitleAsync,
}

const ResultsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage)

export default ResultsPageContainer
