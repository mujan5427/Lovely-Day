import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MenuMain from '../components/menu/Main';
import MenuNavigation from '../components/menu/Navigation';
import DialogFilter from '../components/dialog/Filter';
import DialogLogin from '../components/dialog/Login';
import DialogSignup from '../components/dialog/Signup';
import Index from '../components/layout/Index';
import Search from '../components/layout/Search';
import ExperienceDetail from '../components/layout/ExperienceDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Index} />
          <Route path='/search' component={Search} />
          <Route path='/experiences/:id' component={ExperienceDetail} />
          <MenuMain hasLoggedIn={ true } />
          <MenuNavigation />
          <DialogFilter />
          <DialogLogin />
          <DialogSignup />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
