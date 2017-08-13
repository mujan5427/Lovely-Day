import React from 'react';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, login } from '../../actions/action';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import InputBox from '../form/InputBox';


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

    /* value          : practical value of form elements.
     * needToVerified : this element has other rule that must be validation.
     * isRequired     : the element is required for this form.
     * errorMessage   : just error message. if it have
     */

    this.state = {
      formData: {
        email      : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        password   : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        rememberMe : {
          value: false
        }
      }
    };
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */

  componentWillUnmount() {
    this.resetLocalState();
  }


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

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
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        password   : {
          value: '',
          needToVerified: true,
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
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'email', needToModifiedState);
          break;

        case 'password':
          needToModifiedState = {
            value: target.value,
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
          <InputBox
            type='email'
            value={ email.value }
            errorMessage={ email.errorMessage }
            hasIcon={ true }
            hasPlaceholder={ true }
          />

          { !isEmpty(email.errorMessage) &&
            <div className='form-error-message'>{ email.errorMessage }</div>
          }

          <InputBox
            type='password'
            value={ password.value }
            errorMessage={ password.errorMessage }
            hasIcon={ true }
            hasPlaceholder={ true }
          />

          { !isEmpty(password.errorMessage) &&
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
