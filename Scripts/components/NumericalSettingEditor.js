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
    translations: PropTypes.shape({
      translate: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    validationFn: PropTypes.func.isRequired,
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
    this.props.submitSetting(this.props.name, this.props.value, this.props.validationFn)
  }

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.props.submitSetting(this.props.name, this.props.value, this.props.validationFn)
    }
  }

  render() {
    const t = this.props.translations

    const actions = [
      <FlatButton
        label={t.translate('app.numericalSettingEditor.cancel')}
        secondary={true}
        onTouchTap={this.onRollback}
        />,
      <FlatButton
        label={t.translate('app.numericalSettingEditor.ok')}
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
