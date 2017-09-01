import React from 'react';
import { Link } from 'react-router-dom';
import ScrollWrapper from '../ScrollWrapper';
import Carousel from '../carousel/Carousel';
import Experience from '../experience/Experience';
import Footer from './Footer';
import { fetchData, requestUpdate, getFavourite, addFavourite, deleteFavourite,
         resetEntityExperienceFavorite,
         GROUP_PAGE_INDEX_EXPERIENCE_LIST } from '../../actions/action';


class Index extends React.Component {
  constructor(props) {
    super(props);


    /* * * * * * * * * * * * *
     *                       *
     *     Constant Area     *
     *                       *
     * * * * * * * * * * * * */

    this.CURRENT_PAGE = 1;
    this.REGION       = 'none';
    this.TYPE         = 'none';


    /* * * * * * * * * * * * *
     *                       *
     *   Methods Bind Area   *
     *                       *
     * * * * * * * * * * * * */

    this.toggleFavorite        = this.toggleFavorite.bind(this);
    this.toggleScrollbarStatus = this.toggleScrollbarStatus.bind(this);
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */

  componentWillMount() {
    const { dispatch } = this.props;
    const requestData = {
      current_page: this.CURRENT_PAGE,
      region: this.REGION,
      type: this.TYPE
    };

    dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST, requestData));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch }  = nextProps;
    const previousProps = this.props;
    const currentProps  = nextProps;
    const requestData   = {
      current_page: this.CURRENT_PAGE,
      region: this.REGION,
      type: this.TYPE
    };

    if(previousProps.hasLoggedIn !== currentProps.hasLoggedIn) {
      if(currentProps.hasLoggedIn) {

        // update `favorited` of entity experience list of app state
        dispatch(getFavourite());

      } else {

        // reset `favorited` of entity experience list of app state
        dispatch(resetEntityExperienceFavorite());
      }

    }

    if(previousProps.needUpdate !== currentProps.needUpdate) {
      dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST, requestData));
    }
  }

  componentWillUnmount() {
    this.CURRENT_PAGE = 1;

    // reset pageIndex experienceList
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

  toggleScrollbarStatus() {
    const { dispatch, isThisLastPage, experienceList } = this.props;
    const currentExperienceCount = experienceList.length;
    const currentExperienceTotal = this.CURRENT_PAGE * 6;

    if(isEmpty(isThisLastPage)) {
      if(currentExperienceCount === currentExperienceTotal) {
        this.CURRENT_PAGE++;
        dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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
    const { experienceList, isThisLastPage } = this.props;

    return (
      <ScrollWrapper callback={ this.toggleScrollbarStatus }>
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

          {/* You can place Progress Bar component in this line */}
          {/* and determine whether to show it with `isFetching` props */}

        </div>

        { isThisLastPage &&
          <Footer />
        }
      </ScrollWrapper>
    );
  }
}

export default Index;
