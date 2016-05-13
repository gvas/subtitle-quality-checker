import React, {PropTypes} from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const styles = {
  dialogContent: {
    maxWidth: 500,
  },
  textField: {
    width: '100%',
  },
}

export default class NumericalSettingEditor extends React.Component {

  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRollback: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    this.props.onChange(event.target.value)
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.onSubmit()
    }
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
        actions={actions}>
        <TextField
          value={this.props.value}
          style={styles.textField}
          floatingLabelText={this.props.label}
          errorText={this.props.errorText}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown} />
      </Dialog>
    )
  }
}
