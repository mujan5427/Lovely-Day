import React from 'react';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, signup } from '../../actions/action';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import SelectBox from '../form/SelectBox';


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
    const { displayDialogAccount } = this.props;
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
          <div className={ `input-box icon-right
            ${!isEmpty(email.errorMessage) ?
            'form-component-theme-orange' :
            'form-component-theme-gray'}`}
          >
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='email'
              type='email'
              placeholder='電子郵件'
              value={ email.value }
            />
          </div>

          { !isEmpty(email.errorMessage) &&
            <div className='form-error-message'>{ email.errorMessage }</div>
          }

          <div className={ `input-box icon-right
            ${!isEmpty(firstname.errorMessage) ?
            'form-component-theme-orange' :
            'form-component-theme-gray'}`}
          >
            <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='firstname'
              type='text'
              placeholder='名字'
              value={ firstname.value }
            />
          </div>

          { !isEmpty(firstname.errorMessage) &&
            <div className='form-error-message'>{ firstname.errorMessage }</div>
          }

          <div className={ `input-box icon-right
            ${!isEmpty(lastname.errorMessage) ?
            'form-component-theme-orange' :
            'form-component-theme-gray'}`}
          >
            <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='lastname'
              type='text'
              placeholder='姓氏'
              value={ lastname.value }
            />
          </div>

          { !isEmpty(lastname.errorMessage) &&
            <div className='form-error-message'>{ lastname.errorMessage }</div>
          }

          <div className={ `input-box icon-right
            ${!isEmpty(password.errorMessage) ?
            'form-component-theme-orange' :
            'form-component-theme-gray'}`}
          >
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input
              data-element-name='password'
              type='password'
              placeholder='密碼'
              value={ password.value }
            />
          </div>

          { !isEmpty(password.errorMessage) &&
            <div className='form-error-message'>{ password.errorMessage }</div>
          }

          {/* Select Box */}
          <section>
            <span>生日</span>

            <div className='selectbox-for-birthday'>
              <SelectBox type='month' value={ month.value } errorMessage={ month.errorMessage } />
              <SelectBox type='day' value={ day.value } errorMessage={ day.errorMessage } />
              <SelectBox type='year' value={ year.value } errorMessage={ year.errorMessage } />
            </div>
          </section>

          { (!isEmpty(month.errorMessage) || !isEmpty(day.errorMessage) || !isEmpty(year.errorMessage)) &&
            <div className='form-error-message'>
              { month.errorMessage || day.errorMessage || year.errorMessage }
            </div>
          }

          {/* Check Box */}
          <div className={ `checkbox
            ${!isEmpty(iAgree.errorMessage) ?
            'form-component-theme-orange' :
            'form-component-theme-gray'}`}
          >
            <input id='iAgree' type='checkbox' checked={ iAgree.value } />
            <label htmlFor='iAgree' data-element-name='iAgree'>
              我同意 Lovely Day 的
              <a className='href-highlight' href>服務條款</a>
              、
              <a className='href-highlight' href>隱私政策</a>
            </label>
          </div>

          { !isEmpty(iAgree.errorMessage) &&
            <div className='form-error-message'>{ iAgree.errorMessage }</div>
          }

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
