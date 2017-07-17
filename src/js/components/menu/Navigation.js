import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.hiddenMenu = this.hiddenMenu.bind(this);
  }

  hiddenMenu(event) {
    const { toggleMenuNavigation } = this.props;

    if (event.target.hasAttribute('data-can-be-triggered-element')) {
      toggleMenuNavigation();
    }
  }

  render() {
    const { displayMenuNavigation } = this.props.displayMenu;
    const { toggleMenuNavigation } = this.props;

    return (
      <div>
        <div
          className='menu-box-background'
          style={ displayMenuNavigation ? {display: 'block'} : null }
          onClick={ toggleMenuNavigation }
        ></div>

        <div className='menu-box' style={ displayMenuNavigation ? {left: '0'} : null }>
          <header className='menu-header'>
            <h1>Lovely Day</h1>
            <div>Book Amazing Activities, Tours, and more</div>
          </header>

          <section className='menu-list menu-item-theme-navigation' onClick={ this.hiddenMenu }>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-child fa-fw' aria-hidden='true'></i>
              <label>親子專區</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-heart fa-fw' aria-hidden='true'></i>
              <label>情人專區</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-cutlery fa-fw' aria-hidden='true'></i>
              <label>玩樂廚房</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-american-sign-language-interpreting fa-fw' aria-hidden='true'></i>
              <label>藝文手作</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-tree fa-fw' aria-hidden='true'></i>
              <label>愛上戶外</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-users fa-fw' aria-hidden='true'></i>
              <label>團體遊戲</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-flag-checkered  fa-fw' aria-hidden='true'></i>
              <label>夏令營專區</label>
            </Link>
            <Link to='/experiences/1' data-can-be-triggered-element>
              <i className='fa fa-birthday-cake fa-fw' aria-hidden='true'></i>
              <label>活動包場</label>
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

export default Navigation;
