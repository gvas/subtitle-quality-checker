import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    greaterThanSmall: state.browser.greaterThan.small,
    greaterThanMedium: state.browser.greaterThan.medium,
    userAgent: ownProps.userAgent,
    location: ownProps.location,
    children: ownProps.children,
  }
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
