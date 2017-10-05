import React from 'react';
import Recommendation from '../experience/Recommendation';
import Carousel from '../carousel/Carousel';
import SingleDatePicker from '../singleDatePicker/SingleDatePicker';
import Footer from './Footer';
import Reservation from '../dialog/Reservation';
import { fetchData, requestUpdate, toggleDisplayContent, toggleDisplayBrief,
         toggleDisplayCancelMethod, resetDisplayExperienceDetail,
         toggleDisplayReservation, resetPageExperienceDetail, deleteFavourite,
         addFavourite, resetEntityFavourite,
         GROUP_PAGE_EXPERIENCE_DETAIL } from '../../actions/action';


class ExperienceDetail extends React.Component {
  constructor(props) {
    super(props);

    this.toggleArticleContent      = this.toggleArticleContent.bind(this);
    this.toggleArticleBrief        = this.toggleArticleBrief.bind(this);
    this.toggleArticleCancelMethod = this.toggleArticleCancelMethod.bind(this);
    this.toggleDialogReservation   = this.toggleDialogReservation.bind(this);
    this.toggleFavorite            = this.toggleFavorite.bind(this);
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */

  componentWillMount() {
    const { dispatch, match, selectedExperienceId }  = this.props;
    const urlExperienceId = Number(match.params.id);

    if(!isEmpty(selectedExperienceId) && (selectedExperienceId !== urlExperienceId)) {
      dispatch(requestUpdate(GROUP_PAGE_EXPERIENCE_DETAIL));
    }

    dispatch(fetchData(GROUP_PAGE_EXPERIENCE_DETAIL, {experienceId: urlExperienceId}));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch }    = nextProps;
    const urlExperienceId = Number(nextProps.match.params.id);
    const previousProps   = this.props;
    const currentProps    = nextProps;

    if(previousProps.match.url !== currentProps.match.url) {
      dispatch(resetDisplayExperienceDetail());
      dispatch(requestUpdate(GROUP_PAGE_EXPERIENCE_DETAIL));
      dispatch(fetchData(GROUP_PAGE_EXPERIENCE_DETAIL, {experienceId: urlExperienceId}));
    }

    if(previousProps.hasLoggedIn !== currentProps.hasLoggedIn) {
      if(currentProps.hasLoggedIn) {
        dispatch(requestUpdate(GROUP_PAGE_EXPERIENCE_DETAIL));
        dispatch(fetchData(GROUP_PAGE_EXPERIENCE_DETAIL, {experienceId: urlExperienceId}));

      } else {
        dispatch(resetEntityFavourite(urlExperienceId));

      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    // resetting `displayExperienceDetail` of app state
    dispatch(resetDisplayExperienceDetail());

    // resetting `pageExperienceDetail` of app state
    dispatch(resetPageExperienceDetail());
  }


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  toggleArticleContent() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayContent());
  }

  toggleArticleBrief() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayBrief());
  }

  toggleArticleCancelMethod() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayCancelMethod());
  }

  toggleDialogReservation() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayReservation());
  }

  toggleFavorite() {
    const { dispatch, hasLoggedIn, selectedExperienceId: experienceId, favorited } = this.props;

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
    const { displayContent, displayBrief, displayCancelMethod, displayReservation,
            title, price, content, brief, cancelMethod, host, favorited, carousel,
            recommendationList } = this.props;

    return (
      <div>
        <div className='content'>

          {/* Header Panel */}
          <div className='experience-detail-header'>

            {/* Favorited */}
            <div className='experience-detail-favorited'>
              <a
                className={ favorited ? 'experience-favorite-active' : 'experience-favorite' }
                onClick={ this.toggleFavorite }
              >
                <i className='fa fa-heart-o' aria-hidden='true'></i>
              </a>
            </div>

            {/* Carousel */}
            { carousel &&
              <Carousel useDashboard={ false }>
                {
                  carousel.map(item => {
                    return (
                      <div className='experience-detail-carousel-item'>
                        <img src={ item.image } />
                      </div>
                    );
                  })
                }
              </Carousel>
            }
          </div>

          <div className='experience-detail-body'>

            {/* Left Panel */}
            <div className='experience-detail-left-panel'>

              {/* Title */}
              <section className='experience-detail-section'>
                <h1>
                  { title &&
                    title
                  }
                </h1>
              </section>

              {/* Host Information Panel */}
              <section className='experience-detail-section'>
                <div className='experience-detail-host-information-panel'>
                  <div>
                    <h2>體驗達人</h2>
                    <div>
                      { (host && host.name) &&
                        host.name
                      }
                    </div>
                  </div>
                  <div className='portrait-circle'>
                    { (host && host.image) &&
                      <img src={ host.image } />
                    }
                  </div>
                </div>
              </section>

              {/* Experience Information Panel */}
              <section
                className={ `experience-detail-section ${ displayContent ? 'article-open' : 'article-close'}` }
              >
                <h2>
                  體驗內容
                </h2>

                { brief &&
                  <ul dangerouslySetInnerHTML={ { __html: brief } } />
                }

                <div className='article-smoke'>
                  <a onClick={ this.toggleArticleContent }>看更多</a>
                </div>
              </section>

              <section
                className={ `experience-detail-section ${ displayBrief ? 'article-open' : 'article-close'}` }
              >
                <h2>
                  簡介
                </h2>
                { content &&
                  <div dangerouslySetInnerHTML={ { __html: content } } />
                }

                <div className='article-smoke'>
                  <a onClick={ this.toggleArticleBrief }>看更多</a>
                </div>
              </section>

              <section
                className={ `experience-detail-section ${ displayCancelMethod ? 'article-open' : 'article-close'}` }
              >
                <h2>
                  取消辦法
                </h2>

                { cancelMethod &&
                  <ul dangerouslySetInnerHTML={ { __html: cancelMethod } } />
                }

                <div className='article-smoke'>
                  <a onClick={ this.toggleArticleCancelMethod }>看更多</a>
                </div>
              </section>
            </div>

            {/* Right Panel */}
            <div className='experience-detail-right-panel'>
              <SingleDatePicker />

              { price &&
                <section>
                  <div>{ `TWD ${ price.toLocaleString() } / 人` }</div>
                </section>
              }

              <section>
                <a className='button solid solid-theme-pink'>申請預訂</a>
              </section>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className='experience-detail-bottom-panel'>
            <section className='experience-detail-section'>
              <h1>你可能會喜歡</h1>
            </section>

            {/* Recommendation Panel */}
            <ul className='recommendation-list'>
              { recommendationList &&
                recommendationList.map(item => {
                  return (
                    <Recommendation
                      id={ item.id }
                      imagePath={ item.images[0] }
                      title={ item.title }
                      price={ item.price.toLocaleString() }
                    />
                  );
                })
              }
            </ul>
          </div>

        </div>

        {/* Experience Detail Dashboard Of Mobile Version */}
        <div className='experience-detail-dashboard-of-mobile-version'>
          { price &&
            <span>
              { `TWD ${ price.toLocaleString() } / 人` }
            </span>
          }
          <a className='button solid solid-theme-pink' onClick={ this.toggleDialogReservation }>申請預訂</a>
        </div>

        {/* Footer */}
        <Footer />

        {/* Dialog Reservation */}
        { displayReservation &&
          <Reservation cancelButton={ this.toggleDialogReservation }>
            <div>
              <SingleDatePicker />
            </div>
          </Reservation>
        }
      </div>
    );
  }
}

export default ExperienceDetail;
