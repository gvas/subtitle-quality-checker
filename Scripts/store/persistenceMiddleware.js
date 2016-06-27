import Cookies from 'js-cookie'
import actionTypes from '../constants/actionTypes'
import { restoreValue } from '../actions/index'

const COOKIE_NAME = 'settings'

function getPersistedValues() {
  return Cookies.get(COOKIE_NAME)
    ? JSON.parse(Cookies.get(COOKIE_NAME))
    : {}
}

function persist(key, value) {
  const persistedValues = getPersistedValues()
  persistedValues[key] = value
  Cookies.set(COOKIE_NAME, JSON.stringify(persistedValues), { expires: 365 })
}

const persistenceMiddleware = store => next => action => {
  switch (action.type) {
    case actionTypes.PERSIST_VALUE:
      persist(action.payload.key, action.payload.value)
      break
    case actionTypes.RESTORE_VALUES: {
      const persistedValues = action.payload
      Object.keys(persistedValues).forEach(key => store.dispatch(restoreValue(key, persistedValues[key])))
      break
    }
    default:
      return next(action)
  }
}

export default persistenceMiddleware
