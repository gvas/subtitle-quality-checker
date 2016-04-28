import React, { PropTypes } from 'react'
import { defaultMemoize } from 'reselect'

const getStyles = defaultMemoize((theme, ...classNames) => {
  const palette = theme.baseTheme.palette
  const styles = {
    list: {
      margin: 0,
      padding: '0 0 0 24px',
    },
    listItem: {
      display: 'flex',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 13,
      lineHeight: 20/13,
    },
    color: {
      display: 'inline-block',
      width: 13,
      height: 13,
      borderRadius: '50%',
      margin: '3px 8px 4px 0',
    },
    'color--primary': {
      backgroundColor: palette.primary1Color,
    },
    'color--accent': {
      backgroundColor: palette.accent1Color,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }

  return classNames.reduce((acc, className) => ({
    ...acc,
    ...styles[className],
  }), {})
})

export default class Legend extends React.Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const theme = this.context.muiTheme
    return (
      <ol style={getStyles(theme, 'list')}>
        <li style={getStyles(theme, 'listItem')}>
          <div style={getStyles(theme, 'color', 'color--primary') } />
          <span style={getStyles(theme, 'text')}>Helyes felirattáblák</span>
        </li>
        <li style={getStyles(theme, 'listItem')}>
          <div style={getStyles(theme, 'color', 'color--accent') } />
          <span style={getStyles(theme, 'text')}>Hibás felirattáblák</span>
        </li>
      </ol>
    )
  }
}
