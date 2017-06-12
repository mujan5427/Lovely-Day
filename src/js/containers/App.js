import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div>Body</div>
        <Footer />
      </div>
    );
  }
}

export default App;
