/*eslint-env es6 */
import React, { PropTypes } from 'react'
import SelectSettingEditor from './SelectSettingEditor'

export default class EncodingEditor extends React.Component {

  static propTypes = Object.assign({
    settings: PropTypes.object.isRequired,
    fileContent: PropTypes.instanceOf(ArrayBuffer),
  }, SelectSettingEditor.propTypes)

  onSubmit = () => {
    this.props.submitSetting(this.props.value, this.props.fileContent, this.props.settings)
  }

  render() {
    const { settings, fileContent, ...props } = this.props // eslint-disable-line no-unused-vars
    props.submitSetting = this.onSubmit
    return <SelectSettingEditor {...props} />
  }
}
