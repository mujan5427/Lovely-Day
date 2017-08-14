window.isEmpty     = require('is-empty');
window.browserInfo = require('detect-browser');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';


/* * * * * * * * * * * * *
 *                       *
 *      Components       *
 *                       *
 * * * * * * * * * * * * */

import ContainerHeader from './containers/ContainerHeader';
import Footer from './components/layout/Footer';
import ContainerMain from './containers/ContainerMain';
import ContainerNavigation from './containers/ContainerNavigation';
import DialogFilter from './components/dialog/Filter';
import Index from './components/layout/Index';
import Search from './components/layout/Search';
import ExperienceDetail from './components/layout/ExperienceDetail';
import ContainerDialogWrapper from './containers/ContainerDialogWrapper';
import ContainerRedirectWrapper from './containers/ContainerRedirectWrapper'


let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ContainerHeader />
        <Route exact path='/' component={Index} />
        <Route path='/search' component={Search} />
        <Route path='/profile' component={ContainerRedirectWrapper} />
        <Route path='/experiences/:id' component={ExperienceDetail} />
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
