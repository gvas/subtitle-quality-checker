import React, { PropTypes } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import AppBarContainer from '../containers/AppBarContainer'
import ResponsiveNavigationDrawer from '../containers/ResponsiveNavigationDrawer'

const styles = {
  mainContainer: {
    position: 'relative',
  },
  contentContainer: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
  },
  contentContainerLarge: {
    left: 200,
  },
  content: {
    maxWidth: 480,
    margin: '0 auto',
  },
  contentMedium: {
    maxWidth: 960,
  },
}

export default class App extends React.Component {

  static propTypes = {
    greaterThanSmall: PropTypes.bool.isRequired,
    greaterThanMedium: PropTypes.bool.isRequired,
    userAgent: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    // material-ui needs the user agent for auto-prefixing its styles
    return {
      muiTheme: getMuiTheme(
        lightBaseTheme,
        {
          userAgent: this.props.userAgent,
        }
      ),
    }
  }

  render() {
    const contentContainerStyle = this.props.greaterThanMedium
      ? Object.assign({}, styles.contentContainer, styles.contentContainerLarge)
      : styles.contentContainer
    const contentStyle = this.props.greaterThanSmall
      ? Object.assign({}, styles.content, styles.contentMedium)
      : styles.content

    return (
      <div>
        <AppBarContainer />
        <div style={styles.mainContainer}>
          <ResponsiveNavigationDrawer location={this.props.location} />
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
