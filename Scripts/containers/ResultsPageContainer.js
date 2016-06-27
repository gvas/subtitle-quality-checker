import { connect } from 'react-redux'
import ResultsPage from '../components/ResultsPage'

const mapStateToProps = (state) => ({
  greaterThanSmall: state.browser.greaterThan.small,
  hasResults: state.subtitle.tables.length !== 0,
})

const ResultsPageContainer = connect(
  mapStateToProps
)(ResultsPage)

export default ResultsPageContainer
