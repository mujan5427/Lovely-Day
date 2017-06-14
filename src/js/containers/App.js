import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Filter from '../components/dialog/Filter';
import Login from '../components/dialog/Login';
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
          <Filter />
          <Login />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
