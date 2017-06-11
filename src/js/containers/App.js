import React from 'react';
import Header from '../components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div>Body</div>
        <div>Footer</div>
      </div>
    );
  }
}

export default App;
