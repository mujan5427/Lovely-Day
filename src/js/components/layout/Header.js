import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasLoggedIn = false } = this.props;

    return (
      <header className='layout-header'>

        {/* Mobile Version */}
        <section className='header-mobile-version'>
          <nav>
            <a href><i className='fa fa-reorder fa-fw' aria-hidden='true'></i></a>
          </nav>

          <a href className='logo'>Lovely Day</a>

          <nav>
            <a href><i className='fa fa-search fa-fw' aria-hidden='true'></i></a>
            <a href><i className='fa fa-user-circle-o fa-fw' aria-hidden='true'></i></a>
          </nav>
        </section>

        {/* Desktop Version */}
        <section className='header-desktop-version'>
          <a href className='logo'>Lovely Day</a>

          <nav>
            <a href><i className='fa fa-search' aria-hidden='true'></i></a>
            <a className='hasIcon' href>
              類型
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </a>
            <a href>幫助</a>

            {/* has logged out */}
            { !hasLoggedIn &&
              <a href>註冊</a>
            }
            { !hasLoggedIn &&
              <a href>登入</a>
            }

            {/* has logged in */}
            { hasLoggedIn &&
              <a href>user name</a>
            }
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
