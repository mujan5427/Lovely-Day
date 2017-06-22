import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='experience-list'>
        <div>
          <a href>
            <img className='experience-image' src='/assets/product1.jpg' />
            <figcaption className='experience-title'>遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海</figcaption>
            <div className='experience-description'>
              <span>TWD 1,599</span>
              <a className='button-heart' href><i className='fa fa-heart-o' aria-hidden='true'></i></a>
            </div>
          </a>
        </div>

        <div>
          <a href>
            <img className='experience-image' src='/assets/product3.jpg' />
            <figcaption className='experience-title'>來漢諾威馬場當個一日牛仔吧！</figcaption>
            <div className='experience-description'>
              <span>TWD 2,500</span>
              <a className='button-heart' href><i className='fa fa-heart-o' aria-hidden='true'></i></a>
            </div>
          </a>
        </div>

        <div>
          <a href>
            <img className='experience-image' src='/assets/product3.jpg' />
            <figcaption className='experience-title'>來漢諾威馬場當個一日牛仔吧！</figcaption>
            <div className='experience-description'>
              <span>TWD 2,500</span>
              <a className='button-heart' href><i className='fa fa-heart-o' aria-hidden='true'></i></a>
            </div>
          </a>
        </div>
        <div>
          <a href>
            <img className='experience-image' src='/assets/product3.jpg' />
            <figcaption className='experience-title'>來漢諾威馬場當個一日牛仔吧！</figcaption>
            <div className='experience-description'>
              <span>TWD 2,500</span>
              <a className='button-heart' href><i className='fa fa-heart-o' aria-hidden='true'></i></a>
            </div>
          </a>
        </div>
        <div>
          <a href>
            <img className='experience-image' src='/assets/product3.jpg' />
            <figcaption className='experience-title'>來漢諾威馬場當個一日牛仔吧！</figcaption>
            <div className='experience-description'>
              <span>TWD 2,500</span>
              <a className='button-heart' href><i className='fa fa-heart-o' aria-hidden='true'></i></a>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Experience;
