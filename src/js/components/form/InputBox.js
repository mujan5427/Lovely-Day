import React from 'react';


class InputBox extends React.Component {
  constructor(props) {
    super(props);

    this.chooseInputBoxContentByType = this.chooseInputBoxContentByType.bind(this);
  }

  chooseInputBoxContentByType() {
    const { type } = this.props;

    switch(type) {
      case 'email':
        return this.generateEmailInputBox();

      case 'firstname':
        return this.generateFirstnameInputBox();

      case 'lastname':
        return this.generateLastnameInputBox();

      case 'password':
        return this.generatePasswordInputBox();

      default:
        break;
    }
  }

  generateEmailInputBox() {
    return {
      icon: 'fa fa-envelope-o fa-fw',
      type: 'email',
      placeholder: '電子郵件'
    };
  }

  generateFirstnameInputBox() {
    return {
      icon: 'fa fa-user-o fa-fw',
      type: 'text',
      placeholder: '名字'
    };
  }

  generateLastnameInputBox() {
    return {
      icon: 'fa fa-user-o fa-fw',
      type: 'text',
      placeholder: '姓氏'
    };
  }

  generatePasswordInputBox() {
    return {
      icon: 'fa fa-key fa-fw',
      type: 'password',
      placeholder: '密碼'
    };
  }

  render() {
    const { type, value, errorMessage } = this.props;
    const inputBoxContent = this.chooseInputBoxContentByType();

    return (
      <div className={ `input-box icon-right
        ${!isEmpty(errorMessage) ? 'form-component-theme-orange' : 'form-component-theme-gray'}`}
      >
        <i className={ inputBoxContent.icon } aria-hidden='true'></i>
        <input
          data-element-name={ type }
          type={ inputBoxContent.type }
          placeholder={ inputBoxContent.placeholder }
          value={ value }
        />
      </div>
    );
  }
}

export default InputBox;
