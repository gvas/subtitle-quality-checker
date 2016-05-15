import React, { PropTypes } from 'react'

const styles = {
  svg: {
    borderRadius: '50%',
  },
  circle: {
    fill: 'none',
    stroke: '#ff4081',
    strokeWidth: 5,
  },
  arc: {
    fill: 'none',
    stroke: '#00bcd4',
    strokeWidth: 5,
  },
  text: {
    textAnchor: 'middle',
  },
  percentage: {
    fill: 'rgba(0, 0, 0, 0.87)',
    fontSize: 12,
  },
  percentSign: {
    fill: 'rgba(0, 0, 0, 0.54)',
    fontSize: 6,
  },
}

export default class PercentageBar extends React.Component {

  static propTypes = {
    percentage: PropTypes.number,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const rad = this.props.percentage * 2 * Math.PI / 100
    const largeArcFlag = this.props.percentage <= 50 ? 0 : 1
    const sweepFlag = 1

    const r = 16
    const cX = r
    const cY = r
    const startX = r
    const startY = 0
    const endX = cX + r * Math.sin(rad)
    const endY = cY - r * Math.cos(rad)

    return (
      <svg width="100" height="100" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
        <circle r={r} cx={cX} cy={cY} style={styles.circle} />
        <path d={`M ${startX} ${startY} A ${cX} ${cY} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`} style={styles.arc} />
        <text x={r} y={r} style={styles.text}>
          <tspan dy="0.5ex" style={styles.percentage}>{this.props.percentage}</tspan>
          <tspan dy="-1ex" style={styles.percentSign}>%</tspan>
        </text>
      </svg>
    )
  }
}
