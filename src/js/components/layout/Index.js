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
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      currentPage : 1,
      region      : 'none',
      type        : 'none'
    };


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
    const { currentPage, region, type } = this.state;
    const requestData = {
      current_page : currentPage,
      region       : region,
      type         : type
    };

    dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST, requestData));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch }  = nextProps;
    const { currentPage, region, type } = this.state;
    const previousProps          = this.props;
    const currentProps           = nextProps;
    const currentExperienceCount = currentProps.experienceList.length;
    const currentExperienceTotal = currentPage * 6;
    const requestData            = {
      current_page : currentPage,
      region       : region,
      type         : type
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

    // If experience count of app state is equal expected total (current page * item limit)
    // update the `currentPage` property of local state
    if(currentExperienceCount === currentExperienceTotal) {
      this.setState(Object.assign({}, this.state, { currentPage: currentPage + 1 }));
    }

    if(previousProps.needUpdate !== currentProps.needUpdate) {
      dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST, requestData));
    }
  }

  componentWillUnmount() {
    const defaultValueOfLocalState = {
      currentPage : 1,
      region      : 'none',
      type        : 'none'
    };

    this.setState(Object.assign({}, this.state, defaultValueOfLocalState));

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
    const { dispatch, isThisLastPage } = this.props;

    if(isEmpty(isThisLastPage)) {
      dispatch(requestUpdate(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
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
