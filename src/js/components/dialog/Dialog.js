import React from 'react';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='dialog-box-background'>
        <div className='dialog-box'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Dialog;
