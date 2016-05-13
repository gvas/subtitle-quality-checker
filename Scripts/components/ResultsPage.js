import React, { PropTypes } from 'react'
import {withRouter} from 'react-router'
import FloatingActionButtonMenuContainer from '../containers/FloatingActionButtonMenuContainer'
import StatisticsContainer from '../containers/StatisticsContainer'
import ErrorsContainer from '../containers/ErrorsContainer'
import TablesContainer from '../containers/TablesContainer'

const styles = {
  deck: {
    width: 480,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },
  deckMedium: {
    width: 960,
  },
}

class ResultsPage extends React.Component {

  static propTypes = {
    greaterThanSmall: PropTypes.bool.isRequired,
    hasResults: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!this.props.hasResults) {
      this.props.router.replace('/')
    }
  }

  render() {
    const deckStyle = this.props.greaterThanSmall
      ? Object.assign({}, styles.deck, styles.deckMedium)
      : styles.deck

    return (
      <div>
        <FloatingActionButtonMenuContainer />
        <div style={deckStyle}>
          <StatisticsContainer />
          <ErrorsContainer />
          <TablesContainer />
        </div>
      </div>
    )
  }
}

export default withRouter(ResultsPage)
