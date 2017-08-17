import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie, verifyCookie } from '../../helpers/cookie';
import { toggleHasLoggedIn, toggleDisplayDialogSignup, toggleDisplayDialogLogin, toggleDisplayMenuMain, toggleDisplayMenuNavigation, logout, fetchData, modifyNavigationType, GROUP_HEADER_NAVIGATION } from '../../actions/action';


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
    this.getNavigationTitle   = this.getNavigationTitle.bind(this);
    this.mouseEnterHandler    = this.mouseEnterHandler.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchData(GROUP_HEADER_NAVIGATION));

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

  getNavigationTitle() {
    const { selectedNavigationType } = this.props;
    const titleList = {
      outdoor: {
        title: '愛上戶外'
      },
      summer_camp: {
        title: '夏令營專區'
      },
      baking: {
        title: '玩樂廚房'
      },
      lover: {
        title: '情人專區'
      },
      group: {
        title: '團體遊戲'
      },
      play_with_child: {
        title: '親子專區'
      },
      hand_made: {
        title: '藝文手作'
      }
    };

    return titleList[selectedNavigationType].title;
  }

  mouseEnterHandler(event) {
    const { dispatch }   = this.props;
    const target         = event.target;
    const navigationType = target.getAttribute('data-navigation-type');

    if(!isEmpty(navigationType)) {
      dispatch(modifyNavigationType(navigationType));
    }
  }

  render() {
    const { hasLoggedIn = false, userName = 'user name', selectedNavigationList } = this.props;
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
            { selectedNavigationList &&
              <div
                className='drop-down-menu-wrapper drop-down-menu-type-2'
                onClick={ this.hiddenMenu }
                onMouseLeave={ this.removeStyleAttribute }
              >
                <div>
                  <section>
                    <h1>最新的 { this.getNavigationTitle() }</h1>
                    <div>
                      {
                        selectedNavigationList.map(item => {
                          return (
                            <Link
                              to={ `/experiences/${ item.id }` } data-can-be-triggered-element
                            >
                              <img src={ item.images[0] } />
                              <figcaption>{ item.title }</figcaption>
                            </Link>
                          );
                        })
                      }
                    </div>
                  </section>
                  <section>
                    <nav>
                      <a data-navigation-type='summer_camp' onMouseEnter={ this.mouseEnterHandler }>夏令營專區</a>
                      <a data-navigation-type='hand_made' onMouseEnter={ this.mouseEnterHandler }>藝文手作</a>
                      <a data-navigation-type='baking' onMouseEnter={ this.mouseEnterHandler }>玩樂廚房</a>
                      <a data-navigation-type='outdoor' onMouseEnter={ this.mouseEnterHandler }>愛上戶外</a>
                      <a data-navigation-type='play_with_child' onMouseEnter={ this.mouseEnterHandler }>親子專區</a>
                      <a data-navigation-type='group' onMouseEnter={ this.mouseEnterHandler }>團體遊戲</a>
                      <a data-navigation-type='lover' onMouseEnter={ this.mouseEnterHandler }>情人專區</a>
                    </nav>
                  </section>
                </div>
              </div>
            }

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
