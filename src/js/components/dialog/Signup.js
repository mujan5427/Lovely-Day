import React from 'react';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, signup,
         resetDisplayAlert } from '../../actions/action';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import SelectBox from '../form/SelectBox';
import InputBox from '../form/InputBox';
import Alert from '../alert/Alert';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.hrCSS = {
      margin: '30px 0'
    };

    this.toggleDialogLogin       = this.toggleDialogLogin.bind(this);
    this.toggleDialogSignup      = this.toggleDialogSignup.bind(this);
    this.resetLocalState         = this.resetLocalState.bind(this);
    this.signupButton            = this.signupButton.bind(this);
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
        email     : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        firstname : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        lastname  : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        password  : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        month     : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        day       : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        year      : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        iAgree    : {
          value: false,
          isRequired: true,
          errorMessage: ''
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
    const { dispatch } = this.props;

    this.resetLocalState();
    dispatch(resetDisplayAlert());
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
        email     : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        firstname : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        lastname  : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        password  : {
          value: '',
          needToVerified: true,
          isRequired: true,
          errorMessage: ''
        },
        month     : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        day       : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        year      : {
          value: '',
          isRequired: true,
          errorMessage: ''
        },
        iAgree    : {
          value: false,
          isRequired: true,
          errorMessage: ''
        }
      }
    };

    this.setState(state);
  }

  // Signup Button
  signupButton() {
    const { dispatch }                  = this.props;
    const { email, firstname, lastname, password, month, day, year } = this.state.formData;
    const validationRequiredField       = verifyRequiredField(this.state);
    const validationNeedToVerifiedField = verifyNeedToVerifiedField(this.state);
    var requestData                     = {};

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
      requestData = {
        email     : email.value,
        firstname : firstname.value,
        lastname  : lastname.value,
        password  : password.value,
        birthday  : `${year.value}-${month.value}-${day.value}`
      };

      dispatch(signup(requestData));
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

        case 'firstname':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'firstname', needToModifiedState);
          break;

        case 'lastname':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'lastname', needToModifiedState);
          break;

        case 'password':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'password', needToModifiedState);
          break;

        case 'month':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'month', needToModifiedState);
          break;

        case 'day':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'day', needToModifiedState);
          break;

        case 'year':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'year', needToModifiedState);
          break;

        case 'iAgree':
          needToModifiedState = {
            value: !this.state.formData.iAgree.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'iAgree', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { displayDialogAccount, displayAlert, alertMessage } = this.props;
    const { email, firstname, lastname, password, month, day, year, iAgree } = this.state.formData;

    return (
      <Wrapper displayDialogSignup={ displayDialogAccount.displayDialogSignup }>

        {/* Header */}
        <Header type='TYPE-1' toggleDialogSignup={ this.toggleDialogSignup } />

        {/* Content */}
        <div
          className='dialog-content'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          { displayAlert &&
            <Alert message={ alertMessage } />
          }

          <div>
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
          </div>

          <div>
            <InputBox
              type='firstname'
              value={ firstname.value }
              errorMessage={ firstname.errorMessage }
              hasIcon={ true }
              hasPlaceholder={ true }
            />

            { !isEmpty(firstname.errorMessage) &&
              <div className='form-error-message'>{ firstname.errorMessage }</div>
            }
          </div>

          <div>
            <InputBox
              type='lastname'
              value={ lastname.value }
              errorMessage={ lastname.errorMessage }
              hasIcon={ true }
              hasPlaceholder={ true }
            />

            { !isEmpty(lastname.errorMessage) &&
              <div className='form-error-message'>{ lastname.errorMessage }</div>
            }
          </div>

          <div>
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
          </div>

          {/* Select Box */}
          <section>
            <span>生日</span>

            <div className='selectbox-for-birthday'>
              <SelectBox type='month' value={ month.value } errorMessage={ month.errorMessage } />
              <SelectBox type='day' value={ day.value } errorMessage={ day.errorMessage } />
              <SelectBox type='year' value={ year.value } errorMessage={ year.errorMessage } />
            </div>

            { (!isEmpty(month.errorMessage) || !isEmpty(day.errorMessage) || !isEmpty(year.errorMessage)) &&
              <div className='form-error-message'>
                { month.errorMessage || day.errorMessage || year.errorMessage }
              </div>
            }
          </section>

          {/* Check Box */}
          <div>
            <div className={ `checkbox
              ${!isEmpty(iAgree.errorMessage) ?
              'form-component-theme-orange' :
              'form-component-theme-gray'}`}
            >
              <input id='iAgree' type='checkbox' checked={ iAgree.value } />
              <label htmlFor='iAgree' data-element-name='iAgree'>
                我同意 Lovely Day 的
                <a className='href-highlight'>服務條款</a>
                、
                <a className='href-highlight'>隱私政策</a>
              </label>
            </div>

            { !isEmpty(iAgree.errorMessage) &&
              <div className='form-error-message'>{ iAgree.errorMessage }</div>
            }
          </div>

          <a className='button solid solid-theme-pink' onClick={ this.signupButton }>註冊</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>已經有 Lovely Day 帳號?</span>
            <a className='button hollow hollow-theme-pink' onClick={ this.toggleDialogLogin }>登入</a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Signup;
