import React from 'react';
import Carousel from '../carousel/Carousel';
import FilteredExperienceList from '../../containers/FilteredExperienceList';

import { Link } from 'react-router-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  preventDefaultBehavior(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className='content'>
        <section className='index-carousel'>
          <Carousel
            useDashboard={ true }
            useAutomaticLoop={ true }
            placeHolderImagePath={ '/assets/carousel1.jpg' }
          >
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel5.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel1.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel2.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel3.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel4.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel5.jpg'/>
            </Link>
            <Link to='/profile' onDragStart={ this.preventDefaultBehavior }>
              <img src='/assets/carousel1.jpg'/>
            </Link>
          </Carousel>
        </section>

        <section className='index-experience'>
          <FilteredExperienceList />
        </section>
      </div>
    );
  }
}

export default Index;
