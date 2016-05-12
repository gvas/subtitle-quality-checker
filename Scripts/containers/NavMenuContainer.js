import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { closeNavigationDrawer } from '../actions/index'
import NavMenu from '../components/NavMenu'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state, ownProps) => ({
  translations: getTranslations(state),
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
