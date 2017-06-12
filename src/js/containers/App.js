import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Index from '../components/Index';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Index />
        <Footer />
      </div>
    );
  }
}

export default App;
