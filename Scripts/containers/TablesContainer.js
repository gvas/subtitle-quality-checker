import { connect } from 'react-redux'
import Tables from '../components/Tables'
import { getTables } from '../selectors'

const mapStateToProps = (state) => {
  return {
    tables: getTables(state),
    responsiveState: state.browser,
  }
}

const TablesContainer = connect(
  mapStateToProps
)(Tables)

export default TablesContainer
