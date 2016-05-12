import { connect } from 'react-redux'
import Statistics from '../components/Statistics'
import { getScore, getGoodTablesCount, getBadTablesCount } from '../selectors'

const mapStateToProps = (state, props) => ({
  translations: state.settings.localization.translations,
  style: props.style,
  score: getScore(state),
  goodTablesCount: getGoodTablesCount(state),
  badTablesCount: getBadTablesCount(state),
  fileName: state.appSpecific.file === null ? null : state.appSpecific.file.name,
  responsiveState: state.browser,
})

const StatisticsContainer = connect(
  mapStateToProps
)(Statistics)

export default StatisticsContainer
