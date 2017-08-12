import React from 'react';


class InputBox extends React.Component {
  constructor(props) {
    super(props);

    this.chooseInputBoxContentByType = this.chooseInputBoxContentByType.bind(this);
    this.chooseFormComponentTheme    = this.chooseFormComponentTheme.bind(this);
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

  chooseFormComponentTheme() {
    const { errorMessage, disabled = false } = this.props;

    if (disabled) {
      return 'form-component-theme-light-gray';

    } else if (!isEmpty(errorMessage)) {
      return 'form-component-theme-orange';

    } else {
      return 'form-component-theme-gray';

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
    const { type, value, hasIcon = false, hasPlaceholder = false, disabled = false } = this.props;
    const inputBoxContent = this.chooseInputBoxContentByType();

    return (
      <div className={ `input-box
        ${ hasIcon ? 'icon-right' : '' }
        ${ this.chooseFormComponentTheme() }`}
      >

        { hasIcon &&
          <i className={ inputBoxContent.icon } aria-hidden='true'></i>
        }

        <input
          data-element-name={ type }
          type={ inputBoxContent.type }
          placeholder={ hasPlaceholder ? inputBoxContent.placeholder : null }
          value={ value }
          disabled={ disabled ? true : null }
        />
      </div>
    );
  }
}

export default InputBox;
