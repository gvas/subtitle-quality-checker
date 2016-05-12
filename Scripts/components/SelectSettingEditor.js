import React, {PropTypes} from 'react'
import {Dialog, FlatButton, RadioButton, RadioButtonGroup} from 'material-ui'

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
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    onRollback: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const t = this.props.translations

    const actions = [
      <FlatButton
        label={t.translate('app.selectSettingsEditor.cancel')}
        secondary={true}
        onTouchTap={this.props.onRollback}
        />,
      <FlatButton
        label={t.translate('app.selectSettingsEditor.ok')}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onSubmit}
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
