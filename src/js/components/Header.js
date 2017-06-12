import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <nav className='headerLeftNav'>
          <a href><i className='fa fa-reorder' aria-hidden='true'></i></a>
        </nav>
        <a href className='logo'>Lovely Day</a>
        <nav className='headerRightNav'>
          <a href><i className='fa fa-search' aria-hidden='true'></i></a>
          <a href><i className='fa fa-user-circle-o' aria-hidden='true'></i></a>
        </nav>
      </header>
    );
  }
}

export default Header;
