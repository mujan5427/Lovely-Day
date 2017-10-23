import React from 'react';


class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message = '錯誤訊息。' } = this.props;

    return (
      <div className='alert'>
        <div className='alert-icon'><i className='fa fa-exclamation-circle' aria-hidden='true'></i></div>
        <div className='alert-message'>{ message }</div>
      </div>
    );
  }
}

export default Alert;
