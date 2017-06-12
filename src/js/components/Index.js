import React from 'react';
import Experience from './Experience';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content'>
        <section className='index-carousel'>
          <img src='/assets/carousel1.jpg' />
        </section>
        <section className='index-experience'>
          <Experience />
        </section>
      </div>
    );
  }
}

export default Index;
