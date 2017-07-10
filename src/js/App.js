import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';


/* * * * * * * * * * * * *
 *                       *
 *      Components       *
 *                       *
 * * * * * * * * * * * * */

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MenuMain from './components/menu/Main';
import MenuNavigation from './components/menu/Navigation';
import DialogFilter from './components/dialog/Filter';
import DialogLogin from './components/dialog/Login';
import DialogSignup from './components/dialog/Signup';
import Index from './components/layout/Index';
import Search from './components/layout/Search';
import Profile from './components/layout/Profile';
import ExperienceDetail from './components/layout/ExperienceDetail';


let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header hasLoggedIn={ true } />
        <Route exact path='/' component={Index} />
        <Route path='/search' component={Search} />
        <Route path='/profile' component={Profile} />
        <Route path='/experiences/:id' component={ExperienceDetail} />
        <MenuMain hasLoggedIn={ true } />
        <MenuNavigation />
        <DialogFilter />
        <DialogLogin />
        <DialogSignup />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
