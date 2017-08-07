import React from 'react';
import { validator, EMAIL, PASSWORD } from '../../helpers/verification';
import { changeFormState } from '../../helpers/localState';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, login } from '../../actions/action';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.hrCSS = {
      margin: '30px 0'
    };

    this.toggleDialogLogin       = this.toggleDialogLogin.bind(this);
    this.toggleDialogSignup      = this.toggleDialogSignup.bind(this);
    this.formElementEventHandler = this.formElementEventHandler.bind(this);
    this.loginButton             = this.loginButton.bind(this);
    this.emailBlurHandler        = this.emailBlurHandler.bind(this);
    this.passwordBlurHandler     = this.passwordBlurHandler.bind(this);
    this.changeFormState         = changeFormState.bind(this);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      formData: {
        email      : {
          value: '',
          isVerified: false
        },
        password   : {
          value: '',
          isVerified: false
        },
        rememberMe : {
          value: false
        }
      }
    };
  }

  toggleDialogLogin() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogLogin());
  }

  toggleDialogSignup() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogSignup());
  }

  loginButton() {
    const { dispatch }        = this.props;
    const { email, password } = this.state.formData;
    var requestData           = {};

    if (email.isVerified && password.isVerified) {
      requestData = {
        email: this.state.formData.email.value,
        password: this.state.formData.password.value
      };

      dispatch(login(requestData));
    }
  }

  formElementEventHandler(event) {
    const target      = event.target;
    const elementName =
    isEmpty(target.getAttribute('data-element-name')) ? false : target.getAttribute('data-element-name');
    var state;

    if (elementName) {
      switch(elementName) {
        case 'email':
          state  = this.changeFormState('email', 'value', target.value);
          break;

        case 'password':
          state  = this.changeFormState('password', 'value', target.value);
          break;

        case 'rememberMe':
          state  = this.changeFormState('rememberMe', 'value', !this.state.formData.rememberMe.value);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  emailBlurHandler(event) {
    const target = event.target;
    const value  = target.value;
    const state  = this.changeFormState('email', 'isVerified', validator(EMAIL, value));

    this.setState(state);
  }

  passwordBlurHandler(event) {
    const target = event.target;
    const value  = target.value;
    const state  = this.changeFormState('password', 'isVerified', validator(PASSWORD, value));

    this.setState(state);
  }

  render() {
    const { displayDialogAccount } = this.props;

    return (
      <Wrapper displayDialogLogin={ displayDialogAccount.displayDialogLogin }>

        {/* Header */}
        <Header type='TYPE-1' toggleDialogLogin={ this.toggleDialogLogin } />

        {/* Content */}
        <div
          className='dialog-content'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='email'
              type='email'
              placeholder='電子郵件'
              value={ this.state.formData.email.value }
              onBlur={ this.emailBlurHandler }
            />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='password'
              type='password'
              placeholder='密碼'
              value={ this.state.formData.password.value }
              onBlur={ this.passwordBlurHandler }
            />
          </div>

          <div className='space-between'>
            <div className='checkbox form-component-theme-gray'>
              <input id='rememberme' type='checkbox' checked={ this.state.formData.rememberMe.value } />
              <label htmlFor='rememberme' data-element-name='rememberMe'>記住我</label>
            </div>
            <a href className='href-highlight'>忘記密碼?</a>
          </div>

          <a className='button solid solid-theme-pink' onClick={ this.loginButton }>登入</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>還沒有帳號嗎?</span>
            <a className='button hollow hollow-theme-pink' onClick={ this.toggleDialogSignup }>註冊</a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Login;
