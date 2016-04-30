import { connect } from 'react-redux'
import { readSubtitleAsync } from '../actions/index'
import FloatingActionButtonMenu from '../components/FloatingActionButtonMenu'

const mapStateToProps = (state) => ({
  file: state.appSpecific.file,
  encoding: state.settings.encoding.value,
})

const mapDispatchToProps = {
  readSubtitleAsync,
}

const FloatingActionButtonMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingActionButtonMenu)

export default FloatingActionButtonMenuContainer
