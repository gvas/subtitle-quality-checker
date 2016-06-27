import { connect } from 'react-redux'
import App from '../components/App'
import { deleteSnack } from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  greaterThanSmall: state.browser.greaterThan.small,
  greaterThanMedium: state.browser.greaterThan.medium,
  userAgent: ownProps.userAgent,
  location: ownProps.location,
  children: ownProps.children,
  snack: state.global.snack || '',
  isSnackVisible: state.global.snack != null,
})

const mapDispatchToProps = {
  deleteSnack,
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
