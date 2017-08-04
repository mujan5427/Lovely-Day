import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCookie } from '../../helpers/cookie';
import { toggleHasLoggedIn, toggleDisplayDialogSignup, toggleDisplayDialogLogin, toggleDisplayMenuMain, logout } from '../../actions/action';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.hiddenMenu         = this.hiddenMenu.bind(this);
    this.logoutButton       = this.logoutButton.bind(this);
    this.toggleDialogSignup = this.toggleDialogSignup.bind(this);
    this.toggleDialogLogin  = this.toggleDialogLogin.bind(this);
  }

  hiddenMenu(event) {
    const { dispatch } = this.props;

    if (event.target.hasAttribute('data-can-be-triggered-element')) {
      dispatch(toggleDisplayMenuMain());
    }
  }

  logoutButton(event) {
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

  render() {
    const { hasLoggedIn } = this.props;
    const { displayMenuMain } = this.props.displayMenu;

    return (
      <div
        className='menu-wrapper'
        style={ displayMenuMain ? {display: 'block'} : null }
        onClick={ this.hiddenMenu }
      >
        { hasLoggedIn &&
          <div>

            {/* has logged in */}
            <section className='menu-list menu-item-theme-main'>
              <Link to='/profile' data-can-be-triggered-element>
                <label>個人資料</label>
                <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
              </Link>
              <a>
                <label>訊息</label>
                <i className='fa fa-comment-o fa-fw' aria-hidden='true'></i>
              </a>
              <a>
                <label>心願單</label>
                <i className='fa fa-heart-o fa-fw' aria-hidden='true'></i>
              </a>
            </section>

            <section className='menu-list menu-item-theme-main'>
              <a>幫助</a>
              <a onClick={ this.logoutButton } data-can-be-triggered-element>登出</a>
            </section>
          </div>
        }

        { !hasLoggedIn &&
          <div>

            {/* has logged out */}
            <section className='menu-list menu-item-theme-main'>
              <a onClick={ this.toggleDialogSignup } data-can-be-triggered-element>註冊</a>
              <a onClick={ this.toggleDialogLogin } data-can-be-triggered-element>登入</a>
            </section>

            <section className='menu-list menu-item-theme-main'>
              <a>幫助</a>
            </section>
          </div>
        }
      </div>
    );
  }
}

export default Main;
