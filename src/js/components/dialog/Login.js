import React from 'react';
import Wrapper from './common/Wrapper';
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
      <Wrapper>

        {/* Header */}
        <Header type='TYPE-1' />

        {/* Content */}
        <div className='dialog-content'>
          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input type='email' placeholder='電子郵件' />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
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

          <a className='button solid solid-theme-pink'>登入</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>還沒有帳號嗎?</span>
            <a className='button hollow hollow-theme-pink'>註冊</a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Login;
