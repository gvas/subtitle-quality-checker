import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { openNavigationDrawer } from '../actions/index'
import { getTranslations } from '../selectors/index'

const mapStateToProps = (state) => ({
  title: getTranslations(state).translate('app.appBar.title'),
  style: { position: 'fixed' },
  showMenuIconButton: !state.browser.greaterThan.medium,
})

const mapDispatchToProps = {
  onLeftIconButtonTouchTap: openNavigationDrawer,
}

const AppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)

export default AppBarContainer
