import React from 'react';
import { Link } from 'react-router-dom';

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, image, title, price, favorited } = this.props;

    return (
      <Link to={`experiences/${ id }`}>
        <img className='experience-image' src={ image } />
        <figcaption className='experience-title'>{ title }</figcaption>
        <div className='experience-description'>
          <span>TWD { price.toLocaleString() }</span>
          <a className={ favorited ? 'experience-favorite-active' : 'experience-favorite' } href>
            <i className='fa fa-heart-o' aria-hidden='true'></i>
          </a>
        </div>
      </Link>
    );
  }
}

export default Experience;
