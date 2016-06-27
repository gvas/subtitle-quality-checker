import React, { PropTypes } from 'react'
import { List, ListItem, MakeSelectable } from 'material-ui/List'

const styles = {
  listItem: {
    WebkitAppearance: 'initial',
  },
}

const SelectableList = MakeSelectable(List)

export default class NavMenu extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    hasResults: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    closeNavigationDrawer: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  onChange = (event, pathName) => {
    this.props.closeNavigationDrawer()
    this.props.navigate(pathName)
  }

  render() {
    const t = this.props.translations

    return (
      <SelectableList value={this.props.location.pathname} onChange={this.onChange}>
        <ListItem style={styles.listItem} primaryText={t.translate('app.navMenu.evaluation') }
          value={this.props.hasResults ? "/results" : "/"} />
        <ListItem style={styles.listItem} primaryText={t.translate('app.navMenu.settings') }
          value="/settings" />
        <ListItem style={styles.listItem} primaryText={t.translate('app.navMenu.about') }
          value="/about" />
      </SelectableList>
    )
  }
}
