import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import {withRouter} from 'react-router'
import FileInputFab from './FileInputFab'

const styles = {
  list: {
    position: 'fixed',
    top: 36,
    right: 24,
    zIndex: 1200,
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  listItem: {
    margin: 0,
    padding: '0 0 16px 0',
    textAlign: 'center',
  },
}

class FloatingActionButtonMenu extends React.Component {

  static propTypes = {
    file: PropTypes.object,
    settings: PropTypes.object.isRequired,
    readAndParseAndEvaluate: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  onLoad = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    this.props.readAndParseAndEvaluate(file, this.props.settings)
  }

  onReload = () => {
    this.props.readAndParseAndEvaluate(this.props.file, this.props.settings)
  }

  render() {
    return (
      <ol style={styles.list}>
        <li style={styles.listItem}>
          <FloatingActionButton secondary={true} onTouchTap={this.onReload}>
            <Refresh />
          </FloatingActionButton>
        </li>
        <li style={styles.listItem}>
          <FileInputFab onLoad={this.onLoad} />
        </li>
      </ol>
    )
  }
}

export default withRouter(FloatingActionButtonMenu)
