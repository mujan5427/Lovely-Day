import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasLoggedIn = false } = this.props;

    return (
      <header className='layout-header'>

        {/* Mobile Version */}
        <section className='header-mobile-version'>
          <nav>
            <a href><i className='fa fa-reorder fa-fw' aria-hidden='true'></i></a>
          </nav>

          <a href className='logo'>Lovely Day</a>

          <nav>
            <a href><i className='fa fa-search fa-fw' aria-hidden='true'></i></a>
            <a href><i className='fa fa-user-circle-o fa-fw' aria-hidden='true'></i></a>
          </nav>
        </section>

        {/* Desktop Version */}
        <section className='header-desktop-version'>
          <a href className='logo'>Lovely Day</a>

          <nav>
            <a href><i className='fa fa-search' aria-hidden='true'></i></a>
            <a className='header-menu-navigation hasIcon' href>
              類型
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </a>

            {/* Drop-Down-Menu Main */}
            <div className='drop-down-menu-wrapper drop-down-menu-type-2'>
              <div>
                <section>
                  <h1>最新的 南澳生活節</h1>
                  <div>
                    <a href>
                      <img src='/assets/product2.jpg' />
                      <figcaption>遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海</figcaption>
                    </a>
                    <a href>
                      <img src='/assets/product4.jpg' />
                      <figcaption>遙望基隆嶼，敞洋最美麗的東北角海域！</figcaption>
                    </a>
                    <a href>
                      <img src='/assets/product5.jpg' />
                      <figcaption>墾丁國家公園，帆船之旅，日初東方至晚霞染起</figcaption>
                    </a>
                    <a href>
                      <img src='/assets/product6.jpg' />
                      <figcaption>鹿野高台，熱氣球遨遊天際</figcaption>
                    </a>
                  </div>
                </section>
                <section>
                  <nav>
                    <a href>南澳生活節</a>
                    <a href>夏令營專區</a>
                    <a href>藝文手作</a>
                    <a href>玩樂廚房</a>
                    <a href>愛上戶外</a>
                    <a href>親子專區</a>
                    <a href>團體遊戲</a>
                    <a href>情人專區</a>
                  </nav>
                </section>
              </div>
            </div>

            <a href>幫助</a>

            {/* has logged out */}
            { !hasLoggedIn &&
              <a href>註冊</a>
            }
            { !hasLoggedIn &&
              <a href>登入</a>
            }

            {/* has logged in */}
            { hasLoggedIn &&
              <a className='header-menu-main' href>user name</a>
            }

            {/* Drop-Down-Menu Main */}
            { hasLoggedIn &&
              <div className='drop-down-menu-wrapper drop-down-menu-type-1'>
                <nav>
                  <a href>個人資料</a>
                  <a href>訊息</a>
                  <a href>心願單</a>
                  <a href>登出</a>
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
