/*global Math*/
import React, { PropTypes } from 'react'
import {Card } from 'material-ui'
import merge from 'lodash.merge'
import PercentageBar from './PercentageBar'
import Legend from './Legend'

const styles = {
  card: {
    width: '100%',
    margin: 4,
  },
  cardSmall: {
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
  titleSmall: {
    padding: 24,
  },
  media: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 16px',
  },
  mediaSmall: {
    padding: '0 24px',
  },
  list: {
    margin: 0,
    padding: '8px 16px 24px 16px',
    fontFamily: 'Roboto, sans-serif',
    listStyle: 'none',
  },
  listSmall: {
    padding: '8px 24px 24px 24px',
  },
  listItem: {
    margin: 0,
    padding: '20px 0 16px 0',
  },
  label: {
    display: 'block',
    fontSize: 14,
    lineHeight: 16/14,
    paddingBottom: 4,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  data: {
    display: 'block',
    fontSize: 16,
    lineHeight: 1,
    color: 'rgba(0, 0, 0, 0.87)',
  },
}

export default class Statistics extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
    goodTablesCount: PropTypes.number.isRequired,
    badTablesCount: PropTypes.number.isRequired,
    fileName: PropTypes.string.isRequired,
    responsiveState: PropTypes.object.isRequired,
  }

  render() {
    const t = this.props.translations

    const percentage = Math.round(this.props.score * 100)

    const cardStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.card, styles.cardSmall)
      : styles.card
    const titleStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.title, styles.titleSmall)
      : styles.title
    const mediaStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.media, styles.mediaSmall)
      : styles.media
    const listStyle = this.props.responsiveState.greaterThan.xsmall
      ? merge({}, styles.list, styles.listSmall)
      : styles.list

    return (
      <Card style={cardStyle}>
        <h2 style={titleStyle}>{t.translate('app.statistics.title')}</h2>
        <div style={mediaStyle}>
          <PercentageBar percentage={percentage} />
          <Legend translations={this.props.translations} />
        </div>
        <ol style={listStyle}>
          <li style={styles.listItem}>
            <label style={styles.label}>{t.translate('app.statistics.file')}</label>
            <span style={styles.data}>{this.props.fileName}</span>
          </li>
          <li style={styles.listItem}>
            <label style={styles.label}>{t.translate('app.statistics.goodTablesCount')}</label>
            <span style={styles.data}>{this.props.goodTablesCount}</span>
          </li>
          <li style={styles.listItem}>
            <label style={styles.label}>{t.translate('app.statistics.badTablesCount')}</label>
            <span style={styles.data}>{this.props.badTablesCount}</span>
          </li>
        </ol>
      </Card>
    )
  }
}
