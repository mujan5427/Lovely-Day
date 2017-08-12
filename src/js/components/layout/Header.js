import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie, verifyCookie } from '../../helpers/cookie';
import { toggleHasLoggedIn, toggleDisplayDialogSignup, toggleDisplayDialogLogin, toggleDisplayMenuMain, toggleDisplayMenuNavigation, logout } from '../../actions/action';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.hiddenMenu           = this.hiddenMenu.bind(this);
    this.removeStyleAttribute = this.removeStyleAttribute.bind(this);
    this.logoutButton         = this.logoutButton.bind(this);
    this.toggleDialogLogin    = this.toggleDialogLogin.bind(this)
    this.toggleDialogSignup   = this.toggleDialogSignup.bind(this);
    this.toggleMenuMain       = this.toggleMenuMain.bind(this);
    this.toggleMenuNavigation = this.toggleMenuNavigation.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    if (verifyCookie()) {
        dispatch(toggleHasLoggedIn());
    }
  }

  hiddenMenu(event) {
    if (!event.target.hasAttribute('data-can-be-triggered-element')) {
      event.preventDefault();
    } else {
      event.currentTarget.style.display = 'none';
    }
  }

  removeStyleAttribute(event) {
    event.currentTarget.style.display = null;
  }

  logoutButton() {
    const { dispatch } = this.props;

    dispatch(logout());
  }

  toggleDialogLogin() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogLogin());
  }

  toggleDialogSignup() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogSignup());
  }

  toggleMenuMain() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayMenuMain());
  }

  toggleMenuNavigation() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayMenuNavigation());
  }

  render() {
    const { hasLoggedIn = false, userName = 'user name' } = this.props;
    const { displayMenuMain } = this.props.displayMenu;

    return (
      <header className='layout-header'>

        {/* Mobile Version */}
        <section className='header-mobile-version'>
          <nav>
            <a onClick={ this.toggleMenuNavigation }>
              <i className='fa fa-reorder fa-fw' aria-hidden='true'></i>
            </a>
          </nav>

          <Link to='/' className='logo'>Lovely Day</Link>

          <nav>
            <Link to='/search'><i className='fa fa-search fa-fw' aria-hidden='true'></i></Link>
            { !displayMenuMain &&
              <a onClick={ this.toggleMenuMain }>
                <i className='fa fa-user-circle-o fa-fw' aria-hidden='true'></i>
              </a>
            }

            { displayMenuMain &&
              <a onClick={ this.toggleMenuMain }>
                <i className='fa fa-times fa-fw' aria-hidden='true'></i>
              </a>
            }

          </nav>
        </section>

        {/* Desktop Version */}
        <section className='header-desktop-version'>
          <Link to='/' className='logo'>
            Lovely Day
          </Link>

          <nav>
            <Link to='/search'>
              <i className='fa fa-search' aria-hidden='true'></i>
            </Link>
            <a className='header-menu-navigation hasIcon'>
              類型
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </a>

            {/* Drop-Down-Menu Navigation */}
            <div
              className='drop-down-menu-wrapper drop-down-menu-type-2'
              onClick={ this.hiddenMenu }
              onMouseLeave={ this.removeStyleAttribute }
            >
              <div>
                <section>
                  <h1>最新的 南澳生活節</h1>
                  <div>
                    <Link to='/experiences/1' data-can-be-triggered-element>
                      <img src='/assets/product2.jpg' />
                      <figcaption>遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海</figcaption>
                    </Link>
                    <Link to='/experiences/1' data-can-be-triggered-element>
                      <img src='/assets/product4.jpg' />
                      <figcaption>遙望基隆嶼，敞洋最美麗的東北角海域！</figcaption>
                    </Link>
                    <Link to='/experiences/1' data-can-be-triggered-element>
                      <img src='/assets/product5.jpg' />
                      <figcaption>墾丁國家公園，帆船之旅，日初東方至晚霞染起</figcaption>
                    </Link>
                    <Link to='/experiences/1' data-can-be-triggered-element>
                      <img src='/assets/product6.jpg' />
                      <figcaption>鹿野高台，熱氣球遨遊天際</figcaption>
                    </Link>
                  </div>
                </section>
                <section>
                  <nav>
                    <a>南澳生活節</a>
                    <a>夏令營專區</a>
                    <a>藝文手作</a>
                    <a>玩樂廚房</a>
                    <a>愛上戶外</a>
                    <a>親子專區</a>
                    <a>團體遊戲</a>
                    <a>情人專區</a>
                  </nav>
                </section>
              </div>
            </div>

            <a>幫助</a>

            {/* has logged out */}
            { !hasLoggedIn &&
              <a onClick={ this.toggleDialogSignup }>註冊</a>
            }
            { !hasLoggedIn &&
              <a onClick={ this.toggleDialogLogin }>登入</a>
            }

            {/* has logged in */}
            { hasLoggedIn &&
              <a className='header-menu-main'>{ userName }</a>
            }

            {/* Drop-Down-Menu Main */}
            { hasLoggedIn &&
              <div
                className='drop-down-menu-wrapper drop-down-menu-type-1'
                onClick={ this.hiddenMenu }
                onMouseLeave={ this.removeStyleAttribute }
              >
                <nav>
                  <Link to='/profile' data-can-be-triggered-element>個人資料</Link>
                  <a>訊息</a>
                  <a>心願單</a>
                  <a onClick={ this.logoutButton }>登出</a>
                </nav>
              </div>
            }
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
