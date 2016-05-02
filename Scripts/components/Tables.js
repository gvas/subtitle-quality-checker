import React, { PropTypes } from 'react'
import { Card, IconButton, IconMenu, MenuItem } from 'material-ui'
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list'
import merge from 'lodash.merge'
import TablesNarrow from './TablesNarrow'
import TablesWide from './TablesWide'
import errorTypes from './errorTypes'

const styles = {
  card: {
    width: '100%',
    margin: 4,
    padding: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    margin: 0,
    padding: '0 16px',
  },
  toolbarSmall: {
    padding: '0 24px',
  },
  toolbarTitle: {
    fontSize: 20,
    lineHeight: 64 / 20,
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    padding: 0,
  },
  toolbarActions: {
    display: 'inline-block',
    margin: 0,
    padding: 0,
  },
  filterMenuItem: {
    paddingLeft: 72,
  },
}

const labels = {
  [errorTypes.NO_PROBLEM]: 'Problémamentes',
  [errorTypes.MERGEABLE]: 'Összevonható a következővel',
  [errorTypes.TOO_LONG_ROWS]: 'Túl hosszú sorok',
  [errorTypes.TOO_MANY_CHARACTERS]: 'Túl sok karakter',
  [errorTypes.TOO_MANY_ROWS]: 'Túl sok sor',
  [errorTypes.TOO_LONG_DURATION]: 'Túl hosszú időtartam',
}

export default class Tables extends React.Component {

  static propTypes = {
    filteredTables: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTimeMs: PropTypes.number.isRequired,
        endTimeMs: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      errorType: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })).isRequired,
    responsiveState: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired,
  }

  onToggleItem = (el, menuItem) => {
    this.props.toggleFilter(menuItem.props.value)
  }

  render() {
    const toolbarStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.toolbar, styles.toolbarSmall)
      : styles.toolbar

    const listItems = this.props.filters.map(filter => (
      <MenuItem
        key={filter.errorType}
        value={filter.errorType}
        primaryText={labels[filter.errorType]}
        checked={filter.checked}
        innerDivStyle={styles.filterMenuItem} />
    ))

    return (
      <Card style={styles.card}>
        <div style={toolbarStyle}>
          <h2 style={styles.toolbarTitle}>
            Felirattáblák
          </h2>
          <div style={styles.toolbarActions}>
            <IconMenu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              targetOrigin={{ vertical: 'top', horizontal: 'right' }}
              iconButtonElement={<IconButton><ContentFilter /></IconButton>}
              onItemTouchTap={this.onToggleItem}>
              {listItems}
            </IconMenu>
          </div>
        </div>
        {
          this.props.responsiveState.greaterThan.small
            ? <TablesWide tables={this.props.filteredTables} />
            : <TablesNarrow tables={this.props.filteredTables} />
        }
      </Card>
    )
  }
}
