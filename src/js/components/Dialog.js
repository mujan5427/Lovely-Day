import React from 'react';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='dialog-box-background'>
        <div className='dialog-box'>
          <div className='dialog-header'>
            <a href className='custom-close-dialog-button'>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
            <span>篩選條件</span>
            <a href>
              重設
            </a>
          </div>

          <div className='dialog-footer'></div>
        </div>
      </div>
    );
  }
}

export default Dialog;
