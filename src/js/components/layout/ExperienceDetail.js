import React from 'react';
import { fetchData, toggleDisplayContent, toggleDisplayBrief,
         toggleDisplayCancelMethod, GROUP_PAGE_EXPERIENCE_DETAIL } from '../../actions/action';


class ExperienceDetail extends React.Component {
  constructor(props) {
    super(props);

    this.experienceDetailCSS = {
      'carousel-image': {
        'background-image': 'url(/assets/product7.jpg)'
      }
    }

    this.toggleArticleContent      = this.toggleArticleContent.bind(this);
    this.toggleArticleBrief        = this.toggleArticleBrief.bind(this);
    this.toggleArticleCancelMethod = this.toggleArticleCancelMethod.bind(this);
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */

  componentWillMount() {
    const { dispatch, match }  = this.props;
    const selectedExperienceId = match.params.id;

    dispatch(fetchData(GROUP_PAGE_EXPERIENCE_DETAIL, {experienceId: selectedExperienceId}));
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

  render() {
    const { displayContent, displayBrief, displayCancelMethod, title, price,
            content, brief, cancelMethod, images, host, favorited } = this.props;

    return (
      <div>
        <div className='content'>

          {/* Carousel */}
          <div className='experience-detail-carousel'>
            <div style={ this.experienceDetailCSS['carousel-image'] } className='carousel-image'></div>
            <div className='carousel-picker'>
              <img src='/assets/product7.jpg' />
              <img src='/assets/product8.jpg' />
              <img src='/assets/product9.jpg' />
              <img src='/assets/product10.jpg' />
            </div>
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
                    <div>Hosted by </div>
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
                onClick={ this.toggleArticleContent }
              >
                <h2>
                  體驗內容
                </h2>

                { brief &&
                  <ul dangerouslySetInnerHTML={ { __html: brief } } />
                }

                <div className='article-smoke'>
                  <a>看更多</a>
                </div>
              </section>

              <section
                className={ `experience-detail-section ${ displayBrief ? 'article-open' : 'article-close'}` }
                onClick={ this.toggleArticleBrief }
              >
                <h2>
                  簡介
                </h2>
                { content &&
                  <div dangerouslySetInnerHTML={ { __html: content } } />
                }

                <div className='article-smoke'>
                  <a>看更多</a>
                </div>
              </section>

              <section
                className={ `experience-detail-section ${ displayCancelMethod ? 'article-open' : 'article-close'}` }
                onClick={ this.toggleArticleCancelMethod }
              >
                <h2>
                  取消辦法
                </h2>

                { cancelMethod &&
                  <ul dangerouslySetInnerHTML={ { __html: cancelMethod } } />
                }

                <div className='article-smoke'>
                  <a>看更多</a>
                </div>
              </section>
            </div>

            {/* Right Panel */}
            <div className='experience-detail-right-panel'>
              Right Panel
            </div>
          </div>

          {/* Bottom Panel */}
          <div className='experience-detail-bottom-panel'>
            <section className='experience-detail-section'>
              <h1>你可能會喜歡</h1>
            </section>

            {/* Recommendation Panel */}
            <ul className='recommendation-list'>
              <li>
                <div className='recommendation-item'>
                  <img src='/assets/product5.jpg' />

                  <div className='recommendation-description'>
                    <h1>墾丁國家公園，帆船之旅，日初東方至晚霞染起</h1>
                    <div>
                      <span>$ 1,599</span>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className='recommendation-item'>
                  <img src='/assets/product4.jpg' />

                  <div className='recommendation-description'>
                    <h1>遙望基隆嶼，敞洋最美麗的東北角海域！</h1>
                    <div>
                      <span>$ 950</span>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className='recommendation-item'>
                  <img src='/assets/product6.jpg' />

                  <div className='recommendation-description'>
                    <h1>鹿野高台，熱氣球遨遊天際</h1>
                    <div>
                      <span>$ 2,500</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Experience Detail Footer */}
        <div className='experience-detail-footer'>
          <span>TWD
            { price &&
              ` ${ price.toLocaleString() }`
            }
          </span>
          <span>/ 每人</span>
          <a className='button solid solid-theme-pink'>申請預訂</a>
        </div>
      </div>
    );
  }
}

export default ExperienceDetail;
