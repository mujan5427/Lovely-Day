import React from 'react';
import { Link } from 'react-router-dom';

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.clickFavoriteButton = this.clickFavoriteButton.bind(this);
  }

  clickFavoriteButton(event) {
    const { id, favorited, toggleFavorite } = this.props;

    toggleFavorite(id, favorited);
  }

  render() {
    const { id, image, title, price, favorited } = this.props;

    return (
      <div>
        <a
          className={ favorited ? 'experience-favorite-active' : 'experience-favorite' }
          onClick={ this.clickFavoriteButton }
        >
          <i className='fa fa-heart-o' aria-hidden='true'></i>
        </a>

        <Link to={`experiences/${ id }`}>
          <img className='experience-image' src={ image } />
          <figcaption className='experience-title'>{ title }</figcaption>
          <div className='experience-description'>
            <span>TWD { price.toLocaleString() }</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default Experience;
