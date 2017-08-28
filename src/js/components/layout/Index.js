import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/Carousel';
import Experience from '../experience/Experience';
import { fetchData, requestUpdate, addFavourite, deleteFavourite,
         GROUP_PAGE_INDEX_EXPERIENCE_LIST } from '../../actions/action';


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */


  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch }  = nextProps;
    const previousProps = this.props;
    const currentProps  = nextProps;

    if(previousProps.hasLoggedIn !== currentProps.hasLoggedIn) {
      dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
    }

    if(previousProps.needUpdate !== currentProps.needUpdate) {
      dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
    }
  }


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  toggleFavorite(experienceId, favorited) {
    const { dispatch, hasLoggedIn } = this.props;

    if (!hasLoggedIn) {

      // This can be replace by using Dialog Message component
      console.log(`此操作需要先登入帳號 !`);

    } else {

      // If `favorited` is `true` executes deleteFavourite，otherwise executes addFavourite
      if (favorited) {
        dispatch(deleteFavourite(experienceId));
      } else {
        dispatch(addFavourite(experienceId));
      }
    }
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
    const { experienceList } = this.props;

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
          <div className='experience-list'>
            {experienceList &&
              experienceList.map(item =>
                <Experience
                  key={ item.id }
                  id={ item.id }
                  image={ item.image }
                  title={ item.title }
                  price={ item.price }
                  favorited={ item.favorited }
                  toggleFavorite={ this.toggleFavorite }
                />
              )
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
