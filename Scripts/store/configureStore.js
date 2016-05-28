/*global window*/
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger';
import { createResponsiveStoreEnhancer } from 'redux-responsive'
import rootReducer from '../reducers/index'
import persistenceMiddleware from './persistenceMiddleware'

export default function configureStore(history, initialState) {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history),
    persistenceMiddleware,
  ]
  if (typeof window === 'object') {
    // TODO: figure out how to use it on server side
    middlewares.push(createLogger())
  }

  const storeEnhancers = [
    createResponsiveStoreEnhancer({ calculateStateInitially: false }),
    applyMiddleware(...middlewares),
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(...storeEnhancers)
  )

  return store
}
