import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/Carousel';
import FilteredExperienceList from '../../containers/FilteredExperienceList';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const carousel = [
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

        {/* Carousel */}
        <section className='index-carousel'>
          <Carousel useAutomaticLoop={ true } >
            {
              carousel.map(item => {
                return (
                  <Link to={ item.href }>
                    <img src={ item.image } />
                  </Link>
                );
              })
            }
          </Carousel>
        </section>

        {/* Experience List */}
        <section className='index-experience'>
          <FilteredExperienceList />
        </section>
      </div>
    );
  }
}

export default Index;
