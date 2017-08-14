import React from 'react';


class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, value , errorMessage, children } = this.props;

    return (
      <div
        className={`checkbox ${ !isEmpty(errorMessage) ? 'form-component-theme-orange' : 'form-component-theme-gray' }`}
      >
        <input id={ id } type='checkbox' checked={ value } />
        { children }
      </div>
    );
  }
}

export default CheckBox;
