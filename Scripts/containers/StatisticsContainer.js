import { connect } from 'react-redux'
import Statistics from '../components/Statistics'
import { getScore, getGoodTablesCount, getBadTablesCount, getTranslations } from '../selectors/index'

const mapStateToProps = (state, props) => ({
  translations: getTranslations(state),
  style: props.style,
  score: getScore(state),
  goodTablesCount: getGoodTablesCount(state),
  badTablesCount: getBadTablesCount(state),
  fileName: state.subtitle.file === null ? null : state.subtitle.file.name,
  responsiveState: state.browser,
})

const StatisticsContainer = connect(
  mapStateToProps
)(Statistics)

export default StatisticsContainer
