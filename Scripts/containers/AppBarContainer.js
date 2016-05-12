import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import { openNavigationDrawer } from '../actions/index'

const mapStateToProps = (state) => ({
  title: state.settings.localization.translations.translate('app.appBar.title'),
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
