import React from 'react';

class Wrapper extends React.Component {
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

export default Wrapper;
