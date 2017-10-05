import React from 'react';


class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message = '錯誤訊息。' } = this.props;

    return (
      <div className='alert'>
        <i className='fa fa-exclamation-circle' aria-hidden='true'></i>
        <label>{ message }</label>
      </div>
    );
  }
}

export default Alert;
