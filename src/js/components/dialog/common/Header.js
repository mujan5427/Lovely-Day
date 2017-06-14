import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='dialog-header'>
        <a href className='custom-close-dialog-button'>
          <i className='fa fa-times fa-2x' aria-hidden='true'></i>
        </a>
      </div>
    );
  }
}

export default Header;
