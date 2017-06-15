import React from 'react';
import Dialog from './Dialog';
import Header from './common/Header';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.hrCSS = {
      margin: '30px 0'
    };
  }

  render() {
    return (
      <Dialog>

        {/* Header */}
        <Header />

        {/* Content */}
        <div className='dialog-content'>
          <div className='input-box input-box-icon-right input-box-light'>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input type='email' placeholder='電子郵件' />
          </div>

          <div className='input-box input-box-icon-right input-box-light'>
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input type='password' placeholder='密碼' />
          </div>

          <div className='space-between'>
            <div className='checkbox'>
              <input id='rememberme' type='checkbox' />
              <label htmlFor='rememberme'>記住我</label>
            </div>
            <a href className='href-highlight'>忘記密碼?</a>
          </div>

          <a className='button-solid'>登入</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>還沒有帳號嗎?</span>
            <a className='button-hollow'>註冊</a>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default Login;