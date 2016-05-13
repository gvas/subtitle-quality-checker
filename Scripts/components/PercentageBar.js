import React, { PropTypes } from 'react'
import Typography from 'material-ui/styles/typography'

const getStyles = (props, context) => {
  const theme = context.muiTheme

  return {
    svg: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      transform: 'rotate(-90deg)',
      fontFamily: theme.baseTheme.fontFamily,
    },
    text: {
      transform: 'rotate(90deg)',
      textAnchor: 'middle',
    },
    circle: {
      fill: theme.baseTheme.palette.accent1Color,
      stroke: theme.baseTheme.palette.primary1Color,
      strokeWidth: 32,
      strokeDasharray: `${props.percentage} 100`,
    },
    innerCircle: {
      fill: 'white',
    },
    percentage: {
      fill: Typography.textDarkBlack,
      fontSize: 12,
      alignmentBaseline: 'central',
    },
    percentSign: {
      fill: Typography.textLightBlack,
      fontSize: 6,
      alignmentBaseline: 'baseline',
    },
  }
}

export default class PercentageBar extends React.Component {

  static propTypes = {
    percentage: PropTypes.number,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const styles = getStyles(this.props, this.context)

    return (
      <svg viewBox="0 0 32 32" style={styles.svg}>
        <circle r="50%" cx="50%" cy="50%" style={styles.circle} />
        <circle r="10" cx="50%" cy="50%" style={styles.innerCircle} />
        <text x="50%" y="-50%" style={styles.text}>
          <tspan style={styles.percentage}>{this.props.percentage}</tspan>
          <tspan style={styles.percentSign}>%</tspan>
        </text>
      </svg>
    )
  }
}
