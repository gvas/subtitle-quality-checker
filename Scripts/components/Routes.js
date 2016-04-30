import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../containers/AppContainer'
import IndexPageContainer from '../containers/IndexPageContainer'
import ResultsPageContainer from '../containers/ResultsPageContainer'
import SettingsPageContainer from '../containers/SettingsPageContainer'
import AboutPage from './AboutPage'

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={IndexPageContainer} />
    <Route path="results" component={ResultsPageContainer} />
    <Route path="settings" component={SettingsPageContainer} />
    <Route path="about" component={AboutPage} />
  </Route>
)
