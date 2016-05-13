import React, { PropTypes } from 'react'
import { lengthWithoutCRLF, formatTime } from '../utils/stringUtils'

const styles = {
  table: {
    borderCollapse: 'separate',
    width: '100%',
  },
  cell: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 13,
    lineHeight: 20/13,
    minHeight: 48,
    padding: '14px 56px 13px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'normal',
    textAlign: 'left',
    verticalAlign: 'top',
    whiteSpace: 'pre',
  },
  'cell--first': {
    padding: '14px 56px 13px 24px',
  },
  'cell--last': {
    padding: '14px 24px 13px 0',
  },
  'cell--header': {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 12,
    lineHeight: 24 / 12,
    padding: '16px 56px 15px 0',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  'cell--numeric': {
    textAlign: 'right',
  },
}

const getCps = (startTimeMs, endTimeMs, text) => {
  const cps = lengthWithoutCRLF(text) / (endTimeMs - startTimeMs) * 1000
  return cps.toFixed(2)
}

const getLongestRowLength = text => {
  const lengths = text.split(/\r\n|\r|\n/).map(line => lengthWithoutCRLF(line))
  return Math.max(...lengths)
}

export default class TablesWide extends React.Component {

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

    const lastHeaderCell = Object.assign({}, styles.cell, styles['cell--header'], styles['cell--last'])
    const numericHeaderCell = Object.assign({}, styles.cell, styles['cell--header'], styles['cell--numeric'])
    const firstNumericHeaderCell = Object.assign({}, styles.cell, styles['cell--header'], styles['cell--numeric'], styles['cell--first'])
    const lastCell = Object.assign({}, styles.cell, styles['cell--last'])
    const numericCell = Object.assign({}, styles.cell, styles['cell--numeric'])
    const firstNumericCell = Object.assign({}, styles.cell, styles['cell--numeric'], styles['cell-first'])

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={firstNumericHeaderCell}>#</th>
            <th style={numericHeaderCell}>{t.translate('app.tablesWide.startEnd')}</th>
            <th style={numericHeaderCell}>{t.translate('app.tablesWide.duration')}</th>
            <th style={numericHeaderCell}>{t.translate('app.tablesWide.cps')}</th>
            <th style={numericHeaderCell}>{t.translate('app.tablesWide.rowLength')}</th>
            <th style={numericHeaderCell}>{t.translate('app.tablesWide.charCount')}</th>
            <th style={lastHeaderCell}>{t.translate('app.tablesWide.text')}</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.tables.map((table) => (
              <tr key={table.id}>
                <td style={firstNumericCell}>{table.id}</td>
                <td style={numericCell}>{formatTime(table.startTimeMs)}<br/>{formatTime(table.endTimeMs) }</td>
                <td style={numericCell}>{table.endTimeMs - table.startTimeMs}</td>
                <td style={numericCell}>{getCps(table.startTimeMs, table.endTimeMs, table.text) }</td>
                <td style={numericCell}>{getLongestRowLength(table.text) }</td>
                <td style={numericCell}>{lengthWithoutCRLF(table.text) }</td>
                <td style={lastCell}>{table.text}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
