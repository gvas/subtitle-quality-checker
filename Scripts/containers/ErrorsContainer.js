import { connect } from 'react-redux'
import Errors from '../components/Errors'
import errorTypes from '../constants/errorTypes'
import { getSubtitleErrors } from '../selectors/index'

const getErrors = (state) => {
  const result = []
  const errors = getSubtitleErrors(state)
  for (let errorType in errors) {
    if (errorType !== errorTypes.NO_PROBLEM && errors[errorType] > 0) {
      result.push({
        errorType: errorType,
        count: errors[errorType],
      })
    }
  }
  return result
}

const mapStateToProps = (state) => ({
  translations: state.settings.localization.translations,
  errors: getErrors(state),
  greaterThanSmall: state.browser.greaterThan.small,
})

export default connect(
  mapStateToProps
)(Errors)
