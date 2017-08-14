import React from 'react';


class RadioBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, id, content, selected, errorMessage } = this.props;

    return (
      <div
        className={ `radiobox ${ !isEmpty(errorMessage) ? 'form-component-theme-orange' : 'form-component-theme-gray' }` }
      >
        <input id={ id } type='radio' name={ type } checked={ selected } />
        <label htmlFor={ id } data-element-name={ type }>{ content }</label>
      </div>
    );
  }
}

export default RadioBox;
