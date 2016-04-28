import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { closeNavigationDrawer } from '../actions/index'
import NavMenu from '../components/NavMenu'

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
})

const mapDispatchToProps = {
  closeNavigationDrawer,
  navigate: push,
}

const NavMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu)

export default NavMenuContainer
