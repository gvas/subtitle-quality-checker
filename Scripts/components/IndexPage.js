import React, { PropTypes } from 'react'
import {withRouter} from 'react-router'
import Dropzone from 'react-dropzone'

const styles = {
  dropzone: {
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    margin: 4,
    padding: 24,
    border: '1px solid #e5e5e5',
    borderRadius: 3,
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
  },
  dropzoneActive: {

  },
  svgFont: {
    fontFamily: 'Roboto, sans serif',
    fontSize: 8,
  },
}

class IndexPage extends React.Component {

  static propTypes = {
    greaterThanSmall: PropTypes.bool.isRequired,
    hasResults: PropTypes.bool.isRequired,
    encoding: PropTypes.string.isRequired,
    readSubtitleAsync: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (this.props.hasResults) {
      this.props.router.replace('/results')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasResults) {
      this.props.router.replace('/results')
    }
  }

  onDrop = (files) => {
    this.props.readSubtitleAsync(files[0], this.props.encoding)
  }

  render() {
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

export default withRouter(IndexPage)
