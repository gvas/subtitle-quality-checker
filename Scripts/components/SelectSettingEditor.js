import React, {PropTypes} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

const styles = {
  dialogContent: {
    maxWidth: 500,
  },
  radioIcon: {
    paddingTop: 6,
  },
  radioLabel: {
    lineHeight: 48 / 16,
  },
}

export default class SelectSettingEditor extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    changeSetting: PropTypes.func.isRequired,
    rollbackSetting: PropTypes.func.isRequired,
    submitSetting: PropTypes.func.isRequired,
  }

  onChange = event => {
    this.props.changeSetting(this.props.name, event.target.value)
  }

  onRollback = () => {
    this.props.rollbackSetting(this.props.name)
  }

  onSubmit = () => {
    this.props.submitSetting(this.props.name, this.props.value)
  }

  render() {
    const t = this.props.translations

    const actions = [
      <FlatButton
        label={t.translate('app.selectSettingEditor.cancel') }
        secondary={true}
        onTouchTap={this.onRollback}
        />,
      <FlatButton
        label={t.translate('app.selectSettingEditor.ok') }
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
        />,
    ]
    return (
      <Dialog
        contentStyle={styles.dialogContent}
        open={this.props.isOpen}
        modal={true}
        actions={actions}
        autoScrollBodyContent={true}>
        <RadioButtonGroup
          name="group"
          defaultSelected={this.props.value}
          onChange={this.onChange}>
          {
            this.props.choices.map((choice, index) => (
              <RadioButton key={index} label={choice.label} value={choice.value} iconStyle={styles.radioIcon} labelStyle={styles.radioLabel} />
            ))
          }
        </RadioButtonGroup>
      </Dialog>
    )
  }
}
