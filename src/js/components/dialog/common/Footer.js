import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className='dialog-footer'>
        { children }
      </div>
    );
  }
}

export default Footer;
