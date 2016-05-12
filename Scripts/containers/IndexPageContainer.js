import { connect } from 'react-redux'
import { readSubtitleAsync } from '../actions/index'
import IndexPage from '../components/IndexPage'
import { getTables } from '../selectors'

const mapStateToProps = (state) => ({
  translations: state.settings.localization.translations,
  greaterThanSmall: state.browser.greaterThan.small,
  hasResults: getTables(state).length !== 0,
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
