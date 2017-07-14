import React from 'react';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { displayDialogLogin, displayDialogSignup } = this.props;

    return (
      <div className='dialog-box-background' style={ displayDialogLogin || displayDialogSignup ? {display: 'flex'} : null }>
        <div className='dialog-box'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Wrapper;
