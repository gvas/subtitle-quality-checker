import { connect } from 'react-redux'
import Tables from '../components/Tables'
import { getFilteredTables, getSubtitleErrors } from '../selectors/index'
import { toggleFilter } from '../actions/index'

const getFilters = (state) => {
  const result = []
  const errors = getSubtitleErrors(state)
  const filters = state.filters

  for (let errorType in errors) {
    if (errors[errorType] > 0) {
      result.push({
        errorType: errorType,
        checked: filters[errorType],
      })
    }
  }

  return result
}

const mapStateToProps = (state) => {
  return {
    filteredTables: getFilteredTables(state),
    filters: getFilters(state),
    responsiveState: state.browser,
  }
}

const mapDispatchToProps = {
  toggleFilter,
}

const TablesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables)

export default TablesContainer
