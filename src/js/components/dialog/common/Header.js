import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, toggleDialogLogin, toggleDialogSignup } = this.props;

    switch (type) {
      case 'TYPE-2':
        return (
          <div className='dialog-header'>
            <a href className='custom-close-dialog-button'>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
            <span>篩選條件</span>
            <a href className='href-highlight'>重設</a>
          </div>
        );

      case 'TYPE-1':
      default:
        return (
          <div className='dialog-header' onClick={ toggleDialogLogin || toggleDialogSignup }>
            <a className='custom-close-dialog-button'>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
          </div>
        );
    }
  }
}

export default Header;
