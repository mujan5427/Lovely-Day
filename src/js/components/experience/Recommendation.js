import React from 'react';
import { Link } from 'react-router-dom';


class Recommendation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, imagePath, title, price } = this.props;

    return (
      <li>
        <Link to={`/experiences/${ id }`}>
          <div className='recommendation-item'>
            <img src={ imagePath } />

            <div className='recommendation-description'>
              <h1>{ title }</h1>
              <div>
                <span>{ `TWD ${ price }` }</span>
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default Recommendation;
