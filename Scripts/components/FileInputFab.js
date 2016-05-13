import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const styles = {
  inputFile: {
    display: 'none',
  },
  svgAdd: {
    color: '#ffffff',
    fill: '#ffffff',
  },
}

export default class FileInputFab extends React.Component {

  static propTypes = {
    onLoad: PropTypes.func.isRequired,
  }

  storeInputElementReference = (el) => this.fileInputEl = el

  onOpen = () => {
    this.fileInputEl.value = null
    this.fileInputEl.click()
  }

  render() {
    return (
      <FloatingActionButton secondary={true} onTouchTap={this.onOpen} mini={true}>
        <input type="file" style={styles.inputFile} ref={this.storeInputElementReference} onChange={this.props.onLoad} />
        <svg width="24" height="40" viewBox="0 0 24 24" style={styles.svgAdd}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </FloatingActionButton>
    )
  }
}
