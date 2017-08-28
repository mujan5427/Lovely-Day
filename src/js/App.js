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


 /* * * * * * * * * * * * * * * *
  *                             *
  *  Presentational Components  *
  *                             *
  * * * * * * * * * * * * * * * */

import Footer from './components/layout/Footer';
import DialogFilter from './components/dialog/Filter';
import Search from './components/layout/Search';


let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ContainerHeader />
        <Route exact path='/' component={ ContainerIndex } />
        <Route path='/search' component={Search} />
        <Route path='/profile' component={ContainerRedirectWrapper} />
        <Route path='/experiences/:id' component={ ContainerExperienceDetail } />
        <ContainerMain />
        <ContainerNavigation />
        <DialogFilter />
        <ContainerDialogWrapper />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
