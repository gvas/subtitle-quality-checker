import React, {PropTypes} from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import {Card} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import NumericalSettingEditorContainer from '../containers/NumericalSettingEditorContainer'
import SelectSettingEditorContainer from '../containers/SelectSettingEditorContainer'
import EncodingEditorContainer from '../containers/EncodingEditorContainer'

const styles = {
  card: {
    margin: 4,
  },
  listItem: {
    WebkitAppearance: 'initial',
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
    locale: PropTypes.string.isRequired,
    encoding: PropTypes.string.isRequired,
    maxRowCount: PropTypes.number.isRequired,
    maxCharCount: PropTypes.number.isRequired,
    minDurationMs: PropTypes.number.isRequired,
    maxDurationMs: PropTypes.number.isRequired,
    maxPauseMs: PropTypes.number.isRequired,
    minCps: PropTypes.number.isRequired,
    maxCps: PropTypes.number.isRequired,
    minPauseMs: PropTypes.number.isRequired,
    locales: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    openSettingEditor: PropTypes.func.isRequired,
  }

  onTouchTap = name => {
    this.props.openSettingEditor(name)
  }

  render() {
    const t = this.props.translations

    return (
      <Card style={styles.card}>
        <List>
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.language')}
            secondaryText={this.props.locale}
            onTouchTap={this.onTouchTap.bind(this, 'locale')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.encoding')}
            secondaryText={this.props.encoding}
            onTouchTap={this.onTouchTap.bind(this, 'encoding')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.maxRowCount')}
            secondaryText={this.props.maxRowCount}
            onTouchTap={this.onTouchTap.bind(this, 'maxRowCount')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.maxCharCount')}
            secondaryText={this.props.maxCharCount}
            onTouchTap={this.onTouchTap.bind(this, 'maxCharCount')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.minDurationMs')}
            secondaryText={this.props.minDurationMs}
            onTouchTap={this.onTouchTap.bind(this, 'minDurationMs')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.maxDurationMs')}
            secondaryText={this.props.maxDurationMs}
            onTouchTap={this.onTouchTap.bind(this, 'maxDurationMs')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.maxPauseMs')}
            secondaryText={this.props.maxPauseMs}
            onTouchTap={this.onTouchTap.bind(this, 'maxPauseMs')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.minCps')}
            secondaryText={this.props.minCps}
            onTouchTap={this.onTouchTap.bind(this, 'minCps')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.maxCps')}
            secondaryText={this.props.maxCps}
            onTouchTap={this.onTouchTap.bind(this, 'maxCps')}
            />
          <ListItem
            style={styles.listItem}
            primaryText={t.translate('app.settingsPage.minPauseMs')}
            secondaryText={this.props.minPauseMs}
            onTouchTap={this.onTouchTap.bind(this, 'minPauseMs')}
            />
        </List>
        <SelectSettingEditorContainer name="locale" choices={this.props.locales} />
        <EncodingEditorContainer />
        <NumericalSettingEditorContainer name="maxRowCount" />
        <NumericalSettingEditorContainer name="maxCharCount" />
        <NumericalSettingEditorContainer name="minDurationMs" />
        <NumericalSettingEditorContainer name="maxDurationMs" />
        <NumericalSettingEditorContainer name="maxPauseMs" />
        <NumericalSettingEditorContainer name="minCps" />
        <NumericalSettingEditorContainer name="maxCps" />
        <NumericalSettingEditorContainer name="minPauseMs" />
      </Card>
    )
  }
}
