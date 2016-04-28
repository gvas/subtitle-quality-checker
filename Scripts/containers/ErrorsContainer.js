import { connect } from 'react-redux'
import Errors from '../components/Errors'
import { getSubtitleErrors } from '../selectors'

const mapStateToProps = (state) => ({
  errors: getSubtitleErrors(state),
  greaterThanSmall: state.browser.greaterThan.small,
})

export default connect(
  mapStateToProps
)(Errors)
