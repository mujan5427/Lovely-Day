import React from 'react';
import { Link } from 'react-router-dom';
import { disableDisplayDropDownMenuNavigation } from '../../actions/action';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.hiddenMenuNavigation = this.hiddenMenuNavigation.bind(this);
  }

  hiddenMenuNavigation() {
    const { dispatch } = this.props;

    dispatch(disableDisplayDropDownMenuNavigation());
  }

  render() {
    const { dropDownMenuNavigation } = this.props;

    return (
      <div>
        <div
          className={ dropDownMenuNavigation ? 'menu-box-background-active' : 'menu-box-background' }
          onClick={ this.hiddenMenuNavigation }
        ></div>

        <div className={ dropDownMenuNavigation ? 'menu-box-active' : 'menu-box' }>
          <header className='menu-header'>
            <h1>Lovely Day</h1>
            <div>Book Amazing Activities, Tours, and more</div>
          </header>

          <section className='menu-list menu-item-theme-navigation' onClick={ this.hiddenMenuNavigation }>
            <Link to='/search?category=1'>
              <i className='fa fa-flag-checkered  fa-fw' aria-hidden='true'></i>
              <label>夏令營專區</label>
            </Link>
            <Link to='/search?category=2'>
              <i className='fa fa-american-sign-language-interpreting fa-fw' aria-hidden='true'></i>
              <label>藝文手作</label>
            </Link>
            <Link to='/search?category=3'>
              <i className='fa fa-cutlery fa-fw' aria-hidden='true'></i>
              <label>玩樂廚房</label>
            </Link>
            <Link to='/search?category=4'>
              <i className='fa fa-tree fa-fw' aria-hidden='true'></i>
              <label>愛上戶外</label>
            </Link>
            <Link to='/search?category=5'>
              <i className='fa fa-child fa-fw' aria-hidden='true'></i>
              <label>親子專區</label>
            </Link>
            <Link to='/search?category=6'>
              <i className='fa fa-users fa-fw' aria-hidden='true'></i>
              <label>團體遊戲</label>
            </Link>
            <Link to='/search?category=7'>
              <i className='fa fa-heart fa-fw' aria-hidden='true'></i>
              <label>情人專區</label>
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

export default Navigation;
