import React, { PropTypes } from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'

const SelectableList = SelectableContainerEnhance(List)

export default class NavMenu extends React.Component {

  static propTypes = {
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
    return (
      <SelectableList valueLink={{ value: this.props.location.pathname, requestChange: this.onRequestChange }}>
        <ListItem primaryText="Értékelés"
          value="/" />
        <ListItem primaryText="Beállítások"
          value="/settings" />
        <ListItem primaryText="Névjegy"
          value="/about" />
      </SelectableList>
    )
  }
}
