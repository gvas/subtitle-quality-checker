/*global window, document, navigator*/
import './client.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Routes from './components/Routes'
import configureStore from './store/configureStore'
import { calculateResponsiveState } from './actions'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore(browserHistory)
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
