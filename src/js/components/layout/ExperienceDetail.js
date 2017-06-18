import React from 'react';

class ExperienceDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content'>

        {/* Carousel */}
        <div className='experience-detail-carousel'>
          <img src='/assets/product7.jpg' />
          <div className='carousel-picker'>
            <img src='/assets/product7.jpg' />
            <img src='/assets/product8.jpg' />
            <img src='/assets/product9.jpg' />
            <img src='/assets/product10.jpg' />
          </div>
        </div>

        {/* Title */}
        <section className='experience-detail-section'>
          <h1 className='experienceDetail-title'>
            隱藏在象鼻岩的秘境，划獨木舟探險去吧！
          </h1>
        </section>

        {/* Host Information Panel */}
        <section className='experience-detail-section'>
          <div className='experience-detail-host-information-panel'>
            <div className='host-name'>
              <div>Hosted by </div>
              <div>Garrett</div>
            </div>
            <div className='portrait-circle'>
              <img src='/assets/person1.jpg' />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ExperienceDetail;
