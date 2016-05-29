import React, { PropTypes } from 'react'
import Card from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import TablesNarrow from './TablesNarrow'
import TablesWide from './TablesWide'

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
    WebkitAppearance: 'initial',
  },
}

export default class Tables extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    filteredTables: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTimeMs: PropTypes.number.isRequired,
        endTimeMs: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    filter: PropTypes.string,
    errorTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    responsiveState: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
  }

  onSetFilter = (el, menuItem) => {
    this.props.setFilter(menuItem.props.value)
  }

  render() {
    const t = this.props.translations

    const toolbarStyle = this.props.responsiveState.greaterThan.xsmall
      ? Object.assign({}, styles.toolbar, styles.toolbarSmall)
      : styles.toolbar

    const listItems = this.props.errorTypes.map(errorType => (
      <MenuItem
        key={errorType}
        value={errorType}
        primaryText={t.translate(errorType, { scope: 'app.errorTypes' })}
        style={styles.filterMenuItem} />
    ))

    return (
      <Card style={styles.card}>
        <div style={toolbarStyle}>
          <h2 style={styles.toolbarTitle}>
            {t.translate('app.tables.title')}
          </h2>
          <div style={styles.toolbarActions}>
            <IconMenu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              targetOrigin={{ vertical: 'top', horizontal: 'right' }}
              iconButtonElement={<IconButton><ContentFilter /></IconButton>}
              onItemTouchTap={this.onSetFilter}
              value={this.props.filter}>
              <MenuItem
                key={null}
                value={null}
                primaryText={t.translate('app.tables.noFilter')}
                style={styles.filterMenuItem} />
              {listItems}
            </IconMenu>
          </div>
        </div>
        {
          this.props.responsiveState.greaterThan.small
            ? <TablesWide tables={this.props.filteredTables} translations={this.props.translations} />
            : <TablesNarrow tables={this.props.filteredTables} translations={this.props.translations} />
        }
      </Card>
    )
  }
}
