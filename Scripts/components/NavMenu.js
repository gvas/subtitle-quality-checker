import React, { PropTypes } from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'

const SelectableList = SelectableContainerEnhance(List)

export default class NavMenu extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    closeNavigationDrawer: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  onRequestChange = (event, pathName) => {
    this.props.closeNavigationDrawer()
    this.props.navigate(pathName)
  }

  render() {
    const t = this.props.translations

    return (
      <SelectableList valueLink={{ value: this.props.location.pathname, requestChange: this.onRequestChange }}>
        <ListItem primaryText={t.translate('app.navMenu.evaluation')}
          value="/" />
        <ListItem primaryText={t.translate('app.navMenu.settings')}
          value="/settings" />
        <ListItem primaryText={t.translate('app.navMenu.about')}
          value="/about" />
      </SelectableList>
    )
  }
}
