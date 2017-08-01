import React from 'react';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, getToken } from '../../actions/action';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.hrCSS = {
      margin: '30px 0'
    };

    this.toggleDialogLogin  = this.toggleDialogLogin.bind(this);
    this.toggleDialogSignup = this.toggleDialogSignup.bind(this);
    this.changeLocalState   = this.changeLocalState.bind(this);
    this.login              = this.login.bind(this);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      email      : '',
      password   : '',
      rememberMe : false
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

  login() {
    const { dispatch } = this.props;

    dispatch(getToken(this.state));
  }

  changeLocalState(event) {
    const target      = event.target;
    const elementName =
    isEmpty(target.getAttribute('data-element-name')) ? false : target.getAttribute('data-element-name');
    var state;

    if (elementName) {
      switch(elementName) {
        case 'email':
          state = Object.assign({}, this.state, {email: target.value});
          break;

        case 'password':
          state = Object.assign({}, this.state, {password: target.value});
          break;

        case 'rememberMe':
          state = Object.assign({}, this.state, {rememberMe: !this.state.rememberMe});
          break;

        default:
          break;
      }

      this.setState(state);
    }
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
          onChange={ this.changeLocalState }
          onClick={ this.changeLocalState }
        >
          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='email'
              type='email'
              placeholder='電子郵件'
              value={ this.state.email }
            />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='password'
              type='password'
              placeholder='密碼'
              value={ this.state.password }
            />
          </div>

          <div className='space-between'>
            <div className='checkbox form-component-theme-gray'>
              <input id='rememberme' type='checkbox' checked={ this.state.rememberMe } />
              <label htmlFor='rememberme' data-element-name='rememberMe'>記住我</label>
            </div>
            <a href className='href-highlight'>忘記密碼?</a>
          </div>

          <a className='button solid solid-theme-pink' onClick={ this.login }>登入</a>

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
