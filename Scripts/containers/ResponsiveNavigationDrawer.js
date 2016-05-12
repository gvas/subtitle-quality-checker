import { connect } from 'react-redux'
import NavigationDrawer from '../components/NavigationDrawer'
import { openNavigationDrawer, closeNavigationDrawer } from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  isDocked: state.browser.greaterThan.medium,
  isOpen: state.browser.greaterThan.medium || state.appSpecific.isNavDrawerOpen,
  location: ownProps.location,
})

const mapDispatchToProps = {
  openNavigationDrawer,
  closeNavigationDrawer,
}

const ResponsiveNavigationDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationDrawer)

export default ResponsiveNavigationDrawer
