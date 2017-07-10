import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image, title, price, favorited } = this.props;

    return (
      <a href>
        <img className='experience-image' src={ image } />
        <figcaption className='experience-title'>{ title }</figcaption>
        <div className='experience-description'>
          <span>TWD { price }</span>
          <a className={ favorited ? 'experience-favorite-active' : 'experience-favorite' } href>
            <i className='fa fa-heart-o' aria-hidden='true'></i>
          </a>
        </div>
      </a>
    );
  }
}

export default Experience;
