import React, { PropTypes } from 'react'
import {Card, CardText} from 'material-ui'
import merge from 'lodash.merge'
import errorTypes from './errorTypes'

const styles = {
  card: {
    width: '100%',
    margin: 4,
  },
  cardMedium: {
    flex: '1 1',
  },
  title: {
    fontSize: 24,
    lineHeight: 36/24,
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    padding: '24px 16px',
  },
  titleMedium: {
    padding: 24,
  },
  list: {
    margin: 0,
    padding: '0 16px 16px 16px',
  },
  listMedium: {
    padding: '0 24px 16px 24px',
  },
  listItem: {
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  errorCount: {
    display: 'block',
    width: 72,
    fontFamily: 'Roboto, sans-serif',
    fontSize: 24,
    lineHeight: 48/24,
  },
  errorDescription: {
    position: 'absolute',
    left: 72,
    top: 0,
    display: 'block',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 48/16,
  },
}

const descriptions = {
  [errorTypes.MERGEABLE]: 'Összevonható a következővel',
  [errorTypes.TOO_LONG_ROWS]: 'Túl hosszú sorok',
  [errorTypes.TOO_MANY_CHARACTERS]: 'Túl sok karakter',
  [errorTypes.TOO_MANY_ROWS]: 'Túl sok sor',
  [errorTypes.TOO_LONG_DURATION]: 'Túl hosszú időtartam',
}

export default class Errors extends React.Component {

  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
      errorType: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
    greaterThanSmall: PropTypes.bool.isRequired,
  }

  render() {
    const cardStyle = this.props.greaterThanSmall
      ? merge({}, styles.card, styles.cardMedium)
      : styles.card
    const titleStyle = this.props.greaterThanSmall
      ? merge({}, styles.title, styles.titleMedium)
      : styles.title
    const listStyle = this.props.greaterThanSmall
      ? merge({}, styles.list, styles.listMedium)
      : styles.list

    const listItems = this.props.errors.map(error => (
        <div key={error.errorType} style={styles.listItem}>
          <span style={styles.errorCount}>{error.count}</span>
          <span style={styles.errorDescription}>{descriptions[error.errorType]}</span>
        </div>
    ))

    return (
      <Card style={cardStyle}>
        <h2 style={titleStyle}>Hibák</h2>
        <CardText style={listStyle}>
          {listItems}
        </CardText>
      </Card>
    )
  }
}
