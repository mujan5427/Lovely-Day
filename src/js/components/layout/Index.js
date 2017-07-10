import React from 'react';
import FilteredExperienceList from '../../containers/FilteredExperienceList';

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
          <FilteredExperienceList />
        </section>
      </div>
    );
  }
}

export default Index;
