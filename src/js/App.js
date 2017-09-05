window.isEmpty     = require('is-empty');
window.browserInfo = require('detect-browser');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';


 /* * * * * * * * * * * * * * * *
  *                             *
  *     Container Components    *
  *                             *
  * * * * * * * * * * * * * * * */

import ContainerHeader from './containers/ContainerHeader';
import ContainerMain from './containers/ContainerMain';
import ContainerNavigation from './containers/ContainerNavigation';
import ContainerExperienceDetail from './containers/ContainerExperienceDetail';
import ContainerDialogWrapper from './containers/ContainerDialogWrapper';
import ContainerRedirectWrapper from './containers/ContainerRedirectWrapper'
import ContainerIndex from './containers/ContainerIndex';
import ContainerSearch from './containers/ContainerSearch';


 /* * * * * * * * * * * * * * * *
  *                             *
  *  Presentational Components  *
  *                             *
  * * * * * * * * * * * * * * * */

import DialogFilter from './components/dialog/Filter';


let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ContainerHeader />
        <Route exact path='/' component={ ContainerIndex } />
        <Route path='/search' component={ ContainerSearch } />
        <Route path='/profile' component={ContainerRedirectWrapper} />
        <Route path='/experiences/:id' component={ ContainerExperienceDetail } />
        <ContainerMain />
        <ContainerNavigation />
        <DialogFilter />
        <ContainerDialogWrapper />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
