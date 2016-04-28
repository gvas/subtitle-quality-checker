import React, {PropTypes} from 'react'
import {Dialog, FlatButton, RadioButton, RadioButtonGroup} from 'material-ui'

const encodings = [
  'utf-8',
  'ibm866',
  'iso_8859-2',
  'iso-8859-3',
  'iso-8859-4',
  'iso-8859-5',
  'iso-8859-6',
  'iso-8859-7',
  'iso-8859-8',
  'iso-8859-8-i',
  'windows-1250',
]

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

export default class EncodingEditor extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRollback: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    this.props.onChange(event.target.value)
  }

  render() {
    const actions = [
      <FlatButton
        label="Mégsem"
        secondary={true}
        onTouchTap={this.props.onRollback}
        />,
      <FlatButton
        label="OK"
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
          name="encoding"
          defaultSelected={this.props.value}
          onChange={this.onChange}>
          {
            encodings.map((encoding, index) => (
              <RadioButton key={index} label={encoding} value={encoding} iconStyle={styles.radioIcon} labelStyle={styles.radioLabel} />
            ))
          }
        </RadioButtonGroup>
      </Dialog>
    )
  }
}
