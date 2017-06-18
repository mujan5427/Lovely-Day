import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='menu-box-background'>
        <div className='menu-box'>
          <header className='menu-title'>
            <h1>Lovely Day</h1>
            <div>Book Amazing Activities, Tours, and more</div>
          </header>

          <section className='menu-list menu-item-theme-navigation'>
            <a>
              <i className='fa fa-child fa-fw' aria-hidden='true'></i>
              <label>親子專區</label>
            </a>
            <a>
              <i className='fa fa-heart fa-fw' aria-hidden='true'></i>
              <label>情人專區</label>
            </a>
            <a>
              <i className='fa fa-cutlery fa-fw' aria-hidden='true'></i>
              <label>玩樂廚房</label>
            </a>
            <a>
              <i className='fa fa-american-sign-language-interpreting fa-fw' aria-hidden='true'></i>
              <label>藝文手作</label>
            </a>
            <a>
              <i className='fa fa-tree fa-fw' aria-hidden='true'></i>
              <label>愛上戶外</label>
            </a>
            <a>
              <i className='fa fa-users fa-fw' aria-hidden='true'></i>
              <label>團體遊戲</label>
            </a>
            <a>
              <i className='fa fa-flag-checkered  fa-fw' aria-hidden='true'></i>
              <label>夏令營專區</label>
            </a>
            <a>
              <i className='fa fa-birthday-cake fa-fw' aria-hidden='true'></i>
              <label>活動包場</label>
            </a>
          </section>

        </div>
      </div>
    );
  }
}

export default Navigation;
