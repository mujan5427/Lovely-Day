import React from 'react';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import errorMessageConfig from '../../errorMessageConfig';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, login } from '../../actions/action';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.hrCSS = {
      margin: '30px 0'
    };

    this.toggleDialogLogin       = this.toggleDialogLogin.bind(this);
    this.toggleDialogSignup      = this.toggleDialogSignup.bind(this);
    this.resetLocalState         = this.resetLocalState.bind(this);
    this.loginButton             = this.loginButton.bind(this);
    this.formElementEventHandler = this.formElementEventHandler.bind(this);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      formData: {
        email      : {
          value: '',
          isVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        password   : {
          value: '',
          isVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        rememberMe : {
          value: false
        }
      }
    };
  }

  toggleDialogLogin() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogLogin());
  }

  toggleDialogSignup() {
    const { dispatch } = this.props;

    dispatch(toggleDisplayDialogSignup());
  }

  resetLocalState() {
    var state = {
      formData: {
        email      : {
          value: '',
          isVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        password   : {
          value: '',
          isVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        rememberMe : {
          value: false
        }
      }
    };

    this.setState(state);
  }

  loginButton() {
    const { dispatch }                  = this.props;
    const validationRequiredField       = verifyRequiredField(this.state);
    const validationNeedToVerifiedField = verifyNeedToVerifiedField(this.state);
    var requestData                     = {};
    var email, password;

    // Verify required field
    if (validationRequiredField.hasErrorMessage) {
      this.setState(validationRequiredField.state);

    // Verify need to verified field
    } else if (validationNeedToVerifiedField.hasErrorMessage) {
      this.setState(validationNeedToVerifiedField.state);

    } else {

      // Complete all of validation step
      // and
      // dispatch specified API
      email    = this.state.formData.email.value;
      password = this.state.formData.password.value

      // Reset local state
      this.resetLocalState();

      requestData = {
        email: email,
        password: password
      };

      dispatch(login(requestData));
    }
  }

  formElementEventHandler(event) {
    const target      = event.target;
    const elementName =
    isEmpty(target.getAttribute('data-element-name')) ? false : target.getAttribute('data-element-name');
    var state, needToModifiedState;

    if (elementName) {
      switch(elementName) {
        case 'email':
          needToModifiedState = {
            value: target.value,
            isVerified: true,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'email', needToModifiedState);
          break;

        case 'password':
          needToModifiedState = {
            value: target.value,
            isVerified: true,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'password', needToModifiedState);
          break;

        case 'rememberMe':
          needToModifiedState = {
            value: !this.state.formData.rememberMe.value
          };

          state  = changeFormState(this.state, 'rememberMe', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { displayDialogAccount } = this.props;
    const { email, password } = this.state.formData;

    return (
      <Wrapper displayDialogLogin={ displayDialogAccount.displayDialogLogin }>

        {/* Header */}
        <Header type='TYPE-1' toggleDialogLogin={ this.toggleDialogLogin } />

        {/* Content */}
        <div
          className='dialog-content'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          <div className={ `input-box icon-right
            ${!email.isVerified ? 'form-component-theme-orange' : 'form-component-theme-gray'}`}
          >
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='email'
              type='email'
              placeholder='電子郵件'
              value={ this.state.formData.email.value }
            />
          </div>

          { !email.isVerified &&
            <div className='form-error-message'>{ email.errorMessage }</div>
          }

          <div className={ `input-box icon-right
            ${!password.isVerified ? 'form-component-theme-orange' : 'form-component-theme-gray'}`}
          >
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='password'
              type='password'
              placeholder='密碼'
              value={ this.state.formData.password.value }
            />
          </div>

          { !password.isVerified &&
            <div className='form-error-message'>{ password.errorMessage }</div>
          }

          <div className='space-between'>
            <div className='checkbox form-component-theme-gray'>
              <input id='rememberme' type='checkbox' checked={ this.state.formData.rememberMe.value } />
              <label htmlFor='rememberme' data-element-name='rememberMe'>記住我</label>
            </div>
            <a href className='href-highlight'>忘記密碼?</a>
          </div>

          <a className='button solid solid-theme-pink' onClick={ this.loginButton }>登入</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>還沒有帳號嗎?</span>
            <a className='button hollow hollow-theme-pink' onClick={ this.toggleDialogSignup }>註冊</a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Login;
