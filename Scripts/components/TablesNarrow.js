import React, { PropTypes } from 'react'
import { lengthWithoutCRLF, formatTime } from '../utils/stringUtils'

const styles = {
  list: {
    width: '100%',
    margin: 0,
    padding: '8px 0',
    fontFamily: 'Roboto, sans-serif',
    listStyle: 'none',
  },
  listItem: {
    display: 'block',
    position: 'relative',
    padding: '16px 16px 12px 16px',
  },
  index: {
    position: 'absolute',
    left: 16,
    top: 16,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 24,
    lineHeight: 1,
  },
  primaryText: {
    paddingLeft: 56,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    lineHeight: 20/16,
    whiteSpace: 'pre',
  },
  secondaryText: {
    paddingLeft: 56,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 20/14,
  },
}

const getCps = (startTimeMs, endTimeMs, text) => {
  const cps = lengthWithoutCRLF(text) / (endTimeMs - startTimeMs) * 1000
  return cps.toFixed(2)
}

export default class TablesNarrow extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTimeMs: PropTypes.number.isRequired,
        endTimeMs: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  render() {
    const t = this.props.translations

    return (
      <ol style={styles.list}>
      {
        this.props.tables.map((table) => (
          <li key={table.id} style={styles.listItem}>
            <div style={styles.index}>{table.id}</div>
            <div style={styles.primaryText}>{table.text}</div>
            <div style={styles.secondaryText}>{t.translate('app.tablesNarrow.stats1', { startTimeMs: formatTime(table.startTimeMs), endTimeMs: formatTime(table.endTimeMs) })}</div>
            <div style={styles.secondaryText}>{t.translate('app.tablesNarrow.stats2', { durationMs: table.endTimeMs - table.startTimeMs, charCount: lengthWithoutCRLF(table.text), cps: getCps(table.startTimeMs, table.endTimeMs, table.text) })}</div>
          </li>
        ))
      }
      </ol>
    )
  }
}
