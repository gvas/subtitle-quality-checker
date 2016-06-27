import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import RenderToLayer from 'material-ui/internal/RenderToLayer'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  dropzone: {
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    margin: 4,
    padding: 24,
    border: '1px solid #e5e5e5',
    borderRadius: 3,
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },
  svgFont: {
    fontFamily: 'Roboto, sans serif',
    fontSize: 8,
  },
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

class IndexPage extends React.Component {

  static propTypes = {
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    settings: PropTypes.object.isRequired,
    isBusy: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
  }

  onDrop = (files) => {
    this.props.onDrop(files, this.props.settings)
  }

  renderProgressIndicator() {
    return (
      <div style={styles.layer}>
        <CircularProgress />
      </div>
    )
  }

  render() {
    const t = this.props.translations

    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false} style={styles.dropzone}>
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path stroke="#000000" fill="transparent" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6z"/>
            <text fill="black" x="7" y="14" style={styles.svgFont}>srt</text>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <h2>{t.translate('app.indexPage.instructions1')}</h2>
          <p>{t.translate('app.indexPage.instructions2')}</p>
          <p>{t.translate('app.indexPage.instructions3')}</p>
        </Dropzone>
        <RenderToLayer open={this.props.isBusy} render={this.renderProgressIndicator} />
      </div>
    )
  }
}

export default IndexPage
