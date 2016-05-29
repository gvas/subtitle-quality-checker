import { connect } from 'react-redux'
import Tables from '../components/Tables'
import { getFilteredTables, getTranslations, getSubtitleErrorTypes } from '../selectors/index'
import { setFilter } from '../actions/index'

const mapStateToProps = (state) => ({
  translations: getTranslations(state),
  filteredTables: getFilteredTables(state),
  filter: state.filter,
  errorTypes: getSubtitleErrorTypes(state),
  responsiveState: state.browser,
})

const mapDispatchToProps = {
  setFilter,
}

const TablesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables)

export default TablesContainer
