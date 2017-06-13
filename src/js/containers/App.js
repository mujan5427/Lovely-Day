import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dialog from '../components/Dialog';
import Index from '../components/Index';
import Search from '../components/Search';

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
          <Dialog />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
