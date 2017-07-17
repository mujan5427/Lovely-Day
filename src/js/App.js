window.isEmpty     = require('is-empty');
window.browserInfo = require('detect-browser');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
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
import ContainerLogin from './containers/ContainerLogin';
import ContainerSignup from './containers/ContainerSignup';
import Index from './components/layout/Index';
import Search from './components/layout/Search';
import Profile from './components/layout/Profile';
import ExperienceDetail from './components/layout/ExperienceDetail';


let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ContainerHeader />
        <Route exact path='/' component={Index} />
        <Route path='/search' component={Search} />
        <Route path='/profile' component={Profile} />
        <Route path='/experiences/:id' component={ExperienceDetail} />
        <ContainerMain />
        <ContainerNavigation />
        <DialogFilter />
        <ContainerLogin />
        <ContainerSignup />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
