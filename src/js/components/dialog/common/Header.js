import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.closeButtonHandler  = this.closeButtonHandler.bind(this);
    this.customButtonHandler = this.customButtonHandler.bind(this);
  }

  customButtonHandler() {
    const { customButton } = this.props;

    customButton();
  }

  closeButtonHandler() {
    const { closeButton } = this.props;

    closeButton();
  }

  render() {
    const { type, title, toggleDialogLogin, toggleDialogSignup } = this.props;

    switch (type) {
      case 'TYPE-3':
        return (
          <div className='dialog-header dialog-header-type-3'>
            <a className='custom-close-dialog-button' onClick={ this.closeButtonHandler }>
              <i className='fa fa-times fa-2x fa-fw' aria-hidden='true'></i>
            </a>
            <span>{ title }</span>
          </div>
        );

      case 'TYPE-2':
        return (
          <div className='dialog-header dialog-header-type-2'>
            <a className='custom-close-dialog-button' onClick={ this.closeButtonHandler }>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
            <span>{ title }</span>
            <a className='href-highlight' onClick={ this.customButtonHandler }>重設</a>
          </div>
        );

      case 'TYPE-1':
      default:
        return (
          <div className='dialog-header'>
            <a className='custom-close-dialog-button' onClick={ toggleDialogLogin || toggleDialogSignup }>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
          </div>
        );
    }
  }
}

export default Header;
