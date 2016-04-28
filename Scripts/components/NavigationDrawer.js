import React, { PropTypes } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import NavMenuContainer from '../containers/NavMenuContainer'

export default class NavigationDrawer extends React.Component {

  static propTypes = {
    isDocked: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    openNavigationDrawer: PropTypes.func.isRequired,
    closeNavigationDrawer: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  onRequestChange = (open) => {
    if (open) {
      this.props.openNavigationDrawer()
    } else {
      this.props.closeNavigationDrawer()
    }
  }

  render() {
    const style = this.props.isDocked ? { top: this.context.muiTheme.appBar.height } : {};
    return (
      <LeftNav docked={this.props.isDocked}
        width={200}
        open={this.props.isOpen}
        style={style}
        onRequestChange={this.onRequestChange}>
        <NavMenuContainer location={this.props.location} />
      </LeftNav>
    )
  }
}
