import React, {PropTypes} from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import {Card, List, ListItem} from 'material-ui'
import EncodingEditorContainer from '../containers/EncodingEditorContainer'
import MaxRowCountEditorContainer from '../containers/MaxRowCountEditorContainer'
import MaxCharCountEditorContainer from '../containers/MaxCharCountEditorContainer'
import MaxDurationMsEditorContainer from '../containers/MaxDurationMsEditorContainer'
import MaxPauseMsEditorContainer from '../containers/MaxPauseMsEditorContainer'

const styles = {
  card: {
    margin: 4,
  },
}

export default class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    encoding: PropTypes.string.isRequired,
    maxRowCount: PropTypes.number.isRequired,
    maxCharCount: PropTypes.number.isRequired,
    maxDurationMs: PropTypes.number.isRequired,
    maxPauseMs: PropTypes.number.isRequired,
    openEncodingEditor: PropTypes.func.isRequired,
    openMaxRowCountEditor: PropTypes.func.isRequired,
    openMaxCharCountEditor: PropTypes.func.isRequired,
    openMaxDurationMsEditor: PropTypes.func.isRequired,
    openMaxPauseMsEditor: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Card style={styles.card}>
        <List>
          <ListItem
            primaryText="Feliratfájlok karakterkódolása"
            secondaryText={this.props.encoding}
            onTouchTap={this.props.openEncodingEditor}
            />
          <ListItem
            primaryText="Felirattáblák maximális hossza (sor)"
            secondaryText={this.props.maxRowCount}
            onTouchTap={this.props.openMaxRowCountEditor}
            />
          <ListItem
            primaryText="Felirattáblák maximális hossza (karakter)"
            secondaryText={this.props.maxCharCount}
            onTouchTap={this.props.openMaxCharCountEditor}
            />
          <ListItem
            primaryText="Felirattáblák maximális hossza (ms)"
            secondaryText={this.props.maxDurationMs}
            onTouchTap={this.props.openMaxDurationMsEditor}
            />
          <ListItem
            primaryText="Összevonható felirattáblák közti szünet max. hossza (ms)"
            secondaryText={this.props.maxPauseMs}
            onTouchTap={this.props.openMaxPauseMsEditor}
            />
        </List>
        <EncodingEditorContainer />
        <MaxRowCountEditorContainer />
        <MaxCharCountEditorContainer />
        <MaxDurationMsEditorContainer />
        <MaxPauseMsEditorContainer />
      </Card>
    )
  }
}
