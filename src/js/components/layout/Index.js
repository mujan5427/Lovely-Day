import React from 'react';
import Carousel from '../carousel/Carousel';
import FilteredExperienceList from '../../containers/FilteredExperienceList';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const carouselData = [
      {
        image: '/assets/carousel1.jpg',
        href: '/profile'
      },
      {
        image: '/assets/carousel2.jpg',
        href: '/profile'
      },
      {
        image: '/assets/carousel3.jpg',
        href: '/profile'
      },
      {
        image: '/assets/carousel4.jpg',
        href: '/profile'
      },
      {
        image: '/assets/carousel5.jpg',
        href: '/profile'
      }
    ];

    return (
      <div className='content'>
        <section className='index-carousel'>
          <Carousel
            useDashboard={ true }
            useAutomaticLoop={ true }
            carouselData={ carouselData }
          ></Carousel>
        </section>

        <section className='index-experience'>
          <FilteredExperienceList />
        </section>
      </div>
    );
  }
}

export default Index;
