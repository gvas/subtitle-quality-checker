import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import merge from 'lodash.merge'
import {FloatingActionButton} from 'material-ui'
import Refresh from 'material-ui/lib/svg-icons/navigation/refresh'
import StatisticsContainer from '../containers/StatisticsContainer'
import ErrorsContainer from '../containers/ErrorsContainer'
import TablesContainer from '../containers/TablesContainer'

const styles = {
  dropzone: {
    textAlign: 'center',
    backgroundColor: '#fafafa',
    border: '1px solid #e5e5e5',
    borderRadius: 3,
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
  },
  dropzoneActive: {

  },
  svgFont: {
    fontFamily: 'Robot, sans serif',
    fontSize: 8,
  },
  fab: {
    position: 'fixed',
    top: 40,
    right: 24,
    zIndex: 1200,
  },
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

export default class IndexPage extends React.Component {

  static propTypes = {
    greaterThanSmall: PropTypes.bool.isRequired,
    subtitlesLoaded: PropTypes.bool,
    score: PropTypes.number,
    file: PropTypes.object,
    encoding: PropTypes.string.isRequired,
    readSubtitleAsync: PropTypes.func.isRequired,
  }

  onDrop = (files) => {
    this.props.readSubtitleAsync(files[0], this.props.encoding)
  }

  onReload = () => {
    this.props.readSubtitleAsync(this.props.file, this.props.encoding)
  }

  render() {
    if (this.props.subtitlesLoaded) {
      const deckStyle = this.props.greaterThanSmall
        ? merge({}, styles.deck, styles.deckMedium)
        : styles.deck

      return (
        <div>
          <FloatingActionButton onTouchTap={this.onReload} style={styles.fab}>
            <Refresh />
          </FloatingActionButton>
          <div style={deckStyle}>
            <StatisticsContainer />
            <ErrorsContainer />
            <TablesContainer />
          </div>
        </div>
      )
    }

    return (
      <Dropzone onDrop={this.onDrop} multiple={false} style={styles.dropzone} activeStyle={styles.dropzoneActive}>
        <svg width="48" height="48" viewBox="0 0 24 24">
          <path stroke="#000000" fill="transparent" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6z"/>
          <text fill="black" x="7" y="14" style={styles.svgFont}>srt</text>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <h2>Húzd ide a feliratfájlt, </h2>
        <p>vagy</p>
        <p>kattints a fájl kiválasztásához!</p>
      </Dropzone>
    )
  }
}
