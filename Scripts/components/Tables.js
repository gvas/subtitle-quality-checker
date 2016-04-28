import React, { PropTypes } from 'react'
import { Card, IconButton, IconMenu, MenuItem } from 'material-ui'
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list'
import merge from 'lodash.merge'
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
}

export default class Tables extends React.Component {

  static propTypes = {
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTimeMs: PropTypes.number.isRequired,
        endTimeMs: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    responsiveState: PropTypes.object.isRequired,
  }

  render() {
    const toolbarStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.toolbar, styles.toolbarSmall)
      : styles.toolbar

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
              iconButtonElement={<IconButton><ContentFilter /></IconButton>}>
              <MenuItem value="1" primaryText="Problémamentes tábla" />
              <MenuItem value="2" primaryText="Összevonható a következő táblával" />
              <MenuItem value="3" primaryText="Túl hosszú sorok" />
              <MenuItem value="4" primaryText="Kettőnél több sor" />
            </IconMenu>
          </div>
        </div>
        {
          this.props.responsiveState.greaterThan.xsmall
            ? <TablesWide tables={this.props.tables} />
            : <TablesNarrow tables={this.props.tables} />
        }
      </Card>
    )
  }
}
