import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasLoggedIn = false } = this.props;

    return (
      <div className='menu-wrapper'>
        { !hasLoggedIn ? (
          <div>

            {/* has logged out */}
            <section className='menu-list menu-item-theme-main'>
              <a href>註冊</a>
              <a href>登入</a>
            </section>

            <section className='menu-list menu-item-theme-main'>
              <a href>幫助</a>
            </section>
          </div>
          ) : (
          <div>

            {/* has logged in */}
            <section className='menu-list menu-item-theme-main'>
              <a href>
                <label>個人資料</label>
                <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
              </a>
              <a href>
                <label>訊息</label>
                <i className='fa fa-comment-o fa-fw' aria-hidden='true'></i>
              </a>
              <a href>
                <label>心願單</label>
                <i className='fa fa-heart-o fa-fw' aria-hidden='true'></i>
              </a>
            </section>

            <section className='menu-list menu-item-theme-main'>
              <a href>幫助</a>
              <a href>登出</a>
            </section>
          </div>
          )
        }
      </div>
    );
  }
}

export default Main;
