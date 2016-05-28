import React from 'react'
import ReactDOM from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import Routes from './components/Routes'
import configureStore from './store/configureStore'
import { restoreValues } from './actions/index'

export function RenderView(path, model) {
  const result = {
    html: null,
    status: 404,
    redirect: null,
  }
  const memoryHistory = createMemoryHistory({
    basename: model.VirtualApplicationRootPath,
    entries: [path],
  })
  const store = configureStore(memoryHistory)
  const persistedValues = model.SerializedSettings
    ? JSON.parse(model.SerializedSettings)
    : {}
  store.dispatch(restoreValues(persistedValues))

  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes: Routes, location: path }, (err, redirect, props) => {
    if (redirect) {
      result.redirect = redirect.pathname + redirect.search
    } else if (err) {
      result.status = 500
    } else if (props) {
      // TODO: handle not found

      // material-ui needs the user agent for auto-prefixing its styles
      const createElement = (Component, props) => {
        return <Component {...props} userAgent={model.UserAgent} />
      }
      const appHtml = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...props} createElement={createElement} />
        </Provider>
      )
      result.status = 200
      result.html = renderPage(appHtml, model.VirtualApplicationRootPath, store.getState())
    }
  });

  return result;
}

function renderPage(appHtml, virtualApplicationRootPath, serverState) {
  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Subtitle Evaluation</title>
      <!-- inline some styles -->
      <style>
        body {
          margin: 0;
          background-color: #eee;
        }
      </style>
    </head>
    <body>

      <div id="app">${appHtml}</div>

      <script>window.SERVER_STATE = ${JSON.stringify(serverState)}</script>
      <script>var INITIAL_STATE = { virtualApplicationRootPath: "${virtualApplicationRootPath}" }</script>
      <script src="${virtualApplicationRootPath}/vendors.bundle.js"></script>
      <script src="${virtualApplicationRootPath}/client.bundle.js"></script>
    </body>
    </html>
  `
}

export function RenderPartialView() {
  throw Error('Not implemented.')
}
