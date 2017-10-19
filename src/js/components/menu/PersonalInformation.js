import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCookie } from '../../helpers/cookie';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, logout,
disableDisplayDropDownMenuPersonalInformation
 } from '../../actions/action';


class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);

    this.hiddenMenuPersonalInformation = this.hiddenMenuPersonalInformation.bind(this);
    this.logoutButton                  = this.logoutButton.bind(this);
    this.toggleDialogSignup            = this.toggleDialogSignup.bind(this);
    this.toggleDialogLogin             = this.toggleDialogLogin.bind(this);
  }

  hiddenMenuPersonalInformation() {
    const { dispatch } = this.props;

    dispatch(disableDisplayDropDownMenuPersonalInformation());
  }

  logoutButton(event) {
    const { dispatch } = this.props;

    this.hiddenMenuPersonalInformation();
    dispatch(logout());
  }

  toggleDialogLogin() {
    const { dispatch } = this.props;

    this.hiddenMenuPersonalInformation();
    dispatch(toggleDisplayDialogLogin());
  }

  toggleDialogSignup() {
    const { dispatch } = this.props;

    this.hiddenMenuPersonalInformation();
    dispatch(toggleDisplayDialogSignup());
  }

  render() {
    const { hasLoggedIn, dropDownMenuPersonalInformation } = this.props;

    if(dropDownMenuPersonalInformation) {
      return (
        <div className='menu-wrapper'>
          { hasLoggedIn &&
            <div>

              {/* has logged in */}
              <section className='menu-list menu-item-theme-main'>
                <Link to='/profile' onClick={ this.hiddenMenuPersonalInformation }>
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
                <a onClick={ this.logoutButton }>登出</a>
              </section>
            </div>
          }

          { !hasLoggedIn &&
            <div>

              {/* has logged out */}
              <section className='menu-list menu-item-theme-main'>
                <a onClick={ this.toggleDialogSignup }>註冊</a>
                <a onClick={ this.toggleDialogLogin }>登入</a>
              </section>

              <section className='menu-list menu-item-theme-main'>
                <a>幫助</a>
              </section>
            </div>
          }
        </div>
      );
    } else {
      return null;
    }

  }
}

export default PersonalInformation;
