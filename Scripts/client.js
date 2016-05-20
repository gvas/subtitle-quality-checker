/*eslint-env browser*/
/*global INITIAL_STATE*/
import './client.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Routes from './components/Routes'
import configureStore from './store/configureStore'
import { calculateResponsiveState } from './actions/index'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const browserHistory = useRouterHistory(createHistory)({
  basename: INITIAL_STATE.virtualApplicationRootPath,
})
const store = configureStore(browserHistory, window.SERVER_STATE)
const history = syncHistoryWithStore(browserHistory, store)
const createElement = (Component, props) => {
  return <Component {...props} userAgent={navigator.userAgent} />
}
ReactDOM.render(
  <Provider store={store}>
    <Router routes={Routes} history={history} createElement={createElement} />
  </Provider>,
  document.getElementById('app')
)

store.dispatch(calculateResponsiveState(window))
