import React from 'react';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import { toggleDisplayDialogSignup, toggleDisplayDialogLogin, signup } from '../../actions/action';
import Wrapper from './common/Wrapper';
import Header from './common/Header';


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
              <div className='selectbox'>
                <select
                  className={ !isEmpty(month.errorMessage) ?
                              'form-component-theme-orange' :
                              'form-component-theme-gray' }
                  data-element-name='month'
                  value={ month.value }
                >
                  <option disabled value=''>月</option>
                  <option value='1'>一月</option>
                  <option value='2'>二月</option>
                  <option value='3'>三月</option>
                  <option value='4'>四月</option>
                  <option value='5'>五月</option>
                  <option value='6'>六月</option>
                  <option value='7'>七月</option>
                  <option value='8'>八月</option>
                  <option value='9'>九月</option>
                  <option value='10'>十月</option>
                  <option value='11'>十一月</option>
                  <option value='12'>十二月</option>
                </select>
              </div>

              <div className='selectbox'>
                <select
                  className={ !isEmpty(day.errorMessage) ?
                              'form-component-theme-orange' :
                              'form-component-theme-gray' }
                  data-element-name='day'
                  value={ day.value }
                >
                  <option disabled value=''>日</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>

              <div className='selectbox'>
                <select
                  className={ !isEmpty(year.errorMessage) ?
                              'form-component-theme-orange' :
                              'form-component-theme-gray' }
                  data-element-name='year'
                  value={ year.value }
                >
                  <option disabled value=''>年</option>
                  <option value='1999'>1999</option>
                  <option value='1998'>1998</option>
                  <option value='1997'>1997</option>
                  <option value='1996'>1996</option>
                  <option value='1995'>1995</option>
                  <option value='1994'>1994</option>
                  <option value='1993'>1993</option>
                  <option value='1992'>1992</option>
                  <option value='1991'>1991</option>
                  <option value='1990'>1990</option>
                </select>
              </div>
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
