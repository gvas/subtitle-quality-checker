import React, {PropTypes} from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import {Card, List, ListItem} from 'material-ui'
import EncodingEditorContainer from '../containers/EncodingEditorContainer'
import MaxRowCountEditorContainer from '../containers/MaxRowCountEditorContainer'
import MaxCharCountEditorContainer from '../containers/MaxCharCountEditorContainer'
import MinDurationMsEditorContainer from '../containers/MinDurationMsEditorContainer'
import MaxDurationMsEditorContainer from '../containers/MaxDurationMsEditorContainer'
import MaxPauseMsEditorContainer from '../containers/MaxPauseMsEditorContainer'
import MinCpsEditorContainer from '../containers/MinCpsEditorContainer'
import MaxCpsEditorContainer from '../containers/MaxCpsEditorContainer'
import MinPauseMsEditorContainer from '../containers/MinPauseMsEditorContainer'
import LocalizationEditorContainer from '../containers/LocalizationEditorContainer'

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
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    localization: PropTypes.string.isRequired,
    encoding: PropTypes.string.isRequired,
    maxRowCount: PropTypes.number.isRequired,
    maxCharCount: PropTypes.number.isRequired,
    minDurationMs: PropTypes.number.isRequired,
    maxDurationMs: PropTypes.number.isRequired,
    maxPauseMs: PropTypes.number.isRequired,
    minCps: PropTypes.number.isRequired,
    maxCps: PropTypes.number.isRequired,
    minPauseMs: PropTypes.number.isRequired,
    openLocalizationEditor: PropTypes.func.isRequired,
    openEncodingEditor: PropTypes.func.isRequired,
    openMaxRowCountEditor: PropTypes.func.isRequired,
    openMaxCharCountEditor: PropTypes.func.isRequired,
    openMinDurationMsEditor: PropTypes.func.isRequired,
    openMaxDurationMsEditor: PropTypes.func.isRequired,
    openMaxPauseMsEditor: PropTypes.func.isRequired,
    openMinCpsEditor: PropTypes.func.isRequired,
    openMaxCpsEditor: PropTypes.func.isRequired,
    openMinPauseMsEditor: PropTypes.func.isRequired,
  }

  render() {
    const t = this.props.translations

    return (
      <Card style={styles.card}>
        <List>
          <ListItem
            primaryText={t.translate('app.settingsPage.language')}
            secondaryText={this.props.localization}
            onTouchTap={this.props.openLocalizationEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.encoding')}
            secondaryText={this.props.encoding}
            onTouchTap={this.props.openEncodingEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.maxRowCount')}
            secondaryText={this.props.maxRowCount}
            onTouchTap={this.props.openMaxRowCountEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.maxCharCount')}
            secondaryText={this.props.maxCharCount}
            onTouchTap={this.props.openMaxCharCountEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.minDurationMs')}
            secondaryText={this.props.minDurationMs}
            onTouchTap={this.props.openMinDurationMsEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.maxDurationMs')}
            secondaryText={this.props.maxDurationMs}
            onTouchTap={this.props.openMaxDurationMsEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.maxPauseMs')}
            secondaryText={this.props.maxPauseMs}
            onTouchTap={this.props.openMaxPauseMsEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.minCps')}
            secondaryText={this.props.minCps}
            onTouchTap={this.props.openMinCpsEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.maxCps')}
            secondaryText={this.props.maxCps}
            onTouchTap={this.props.openMaxCpsEditor}
            />
          <ListItem
            primaryText={t.translate('app.settingsPage.minPauseMs')}
            secondaryText={this.props.minPauseMs}
            onTouchTap={this.props.openMinPauseMsEditor}
            />
        </List>
        <LocalizationEditorContainer />
        <EncodingEditorContainer />
        <MaxRowCountEditorContainer />
        <MaxCharCountEditorContainer />
        <MinDurationMsEditorContainer />
        <MaxDurationMsEditorContainer />
        <MaxPauseMsEditorContainer />
        <MinCpsEditorContainer />
        <MaxCpsEditorContainer />
        <MinPauseMsEditorContainer />
      </Card>
    )
  }
}
