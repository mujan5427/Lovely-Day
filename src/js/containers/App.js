import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DialogFilter from '../components/dialog/Filter';
import DialogLogin from '../components/dialog/Login';
import DialogSignup from '../components/dialog/Signup';
import Index from '../components/layout/Index';
import Search from '../components/layout/Search';

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
