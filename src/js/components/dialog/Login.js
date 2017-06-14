import React from 'react';
import Dialog from './Dialog';
import Header from './common/Header';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog>

        {/* Header */}
        <Header />

        {/* Content */}
        <div>
          <div className='input-box input-box-icon-right input-box-light height-64' style={ {margin: '10px 0'} }>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input type='email' placeholder='電子郵件' />
          </div>

          <div className='input-box input-box-icon-right input-box-light height-64'>
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input type='password' placeholder='密碼' />
          </div>

          <div className='space-between'>
            <div className='checkbox'>
              <input id='rememberme' type='checkbox' />
              <label htmlFor='rememberme'>記住我</label>
            </div>
            <a href className='forgetme'>忘記密碼?</a>
          </div>

          <a className='button-solid height-64'>登入</a>

          <hr className='hr' />

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
