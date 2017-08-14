import React from 'react';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import { verifyRequiredField, verifyNeedToVerifiedField } from '../../helpers/verification';
import SelectBox from '../form/SelectBox';
import InputBox from '../form/InputBox';
import RadioBoxGroup from '../form/RadioBoxGroup';
import CheckBox from '../form/CheckBox';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { firstname, lastname, gender, birthday, language, educationLevel, interest } = this.props;
    const year  = birthday.split('-')[0];
    const month = birthday.split('-')[1];
    const day   = birthday.split('-')[2];

    this.formElementEventHandler = this.formElementEventHandler.bind(this);
    this.saveButton              = this.saveButton.bind(this);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    //  先透過 container component 轉換 app state 成 props
    //  再將 props 嵌入 local state of Profile

     this.state = {
       formData: {
         firstname: {
           value: firstname,
           isRequired: true,
           errorMessage: ''
         },
         lastname: {
           value: lastname,
           isRequired: true,
           errorMessage: ''
         },
         gender: {
           value: !isEmpty(gender) ? gender : '',
           errorMessage: ''
         },
         month: {
           value: month,
           isRequired: true,
           errorMessage: ''
         },
         day: {
           value: day,
           isRequired: true,
           errorMessage: ''
         },
         year: {
           value: year,
           isRequired: true,
           errorMessage: ''
         },
         language: {
           value: !isEmpty(language) ? language : '',
           errorMessage: ''
         },
         educationLevel: {
           value: !isEmpty(educationLevel) ? educationLevel : '',
           errorMessage: ''
         },
         sport: {
           value: this._parseInterest(interest, 'sport'),
           errorMessage: ''
         },
         handmade: {
           value: this._parseInterest(interest, 'hand_made'),
           errorMessage: ''
         },
         baking: {
           value: this._parseInterest(interest, 'baking'),
           errorMessage: ''
         },
         art: {
           value: this._parseInterest(interest, 'art'),
           errorMessage: ''
         },
         history: {
           value: this._parseInterest(interest, 'history'),
           errorMessage: ''
         }
       }
     };
  }

  _parseInterest(interest, specifiedProperty) {
    const indexOfSearchResult = interest.indexOf(specifiedProperty);

    if(indexOfSearchResult !== -1) {
      return true;
    }

    return false;
  }

  saveButton() {
    const { dispatch }                  = this.props;
    const { firstname, lastname, month, day, year } = this.state.formData;
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
      console.log(`全部驗證完成`);
      // Complete all of validation step
      // and
      // dispatch specified API
      // requestData = {
      //   email     : email.value,
      //   firstname : firstname.value,
      //   lastname  : lastname.value,
      //   password  : password.value,
      //   birthday  : `${year.value}-${month.value}-${day.value}`
      // };
      //
      // dispatch(signup(requestData));
    }
  }

  formElementEventHandler(event) {
    const target      = event.target;
    const elementName =
    isEmpty(target.getAttribute('data-element-name')) ? false : target.getAttribute('data-element-name');

    var state, needToModifiedState;

    if (elementName) {
      switch(elementName) {
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

        case 'gender':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'gender', needToModifiedState);
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

        case 'language':
          needToModifiedState = {
            value: target.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'language', needToModifiedState);
          break;

        case 'educationLevel':
          needToModifiedState = {
            value: target.getAttribute('for'),
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'educationLevel', needToModifiedState);
          break;

        case 'sport':
          needToModifiedState = {
            value: !this.state.formData.sport.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'sport', needToModifiedState);
          break;

        case 'handmade':
          needToModifiedState = {
            value: !this.state.formData.handmade.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'handmade', needToModifiedState);

          break;

        case 'baking':
          needToModifiedState = {
            value: !this.state.formData.baking.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'baking', needToModifiedState);
          break;

        case 'art':
          needToModifiedState = {
            value: !this.state.formData.art.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'art', needToModifiedState);
          break;

        case 'history':
          needToModifiedState = {
            value: !this.state.formData.history.value,
            errorMessage: ''
          };

          state  = changeFormState(this.state, 'history', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { email } = this.props;
    const { firstname, lastname, gender, year, month, day, language, educationLevel, sport, handmade, baking, art, history } = this.state.formData;

    return (
      <div className='content'>
        <section
          className='profile-section'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          <h1>個人資料</h1>

          <div>
            <label>名字</label>
            <InputBox type='firstname' value={ firstname.value } errorMessage={ firstname.errorMessage } />

            { !isEmpty(firstname.errorMessage) &&
              <div className='form-error-message'>{ firstname.errorMessage }</div>
            }

          </div>

          <div>
            <label>姓氏</label>
            <InputBox type='lastname' value={ lastname.value } errorMessage={ lastname.errorMessage } />

            { !isEmpty(lastname.errorMessage) &&
              <div className='form-error-message'>{ lastname.errorMessage }</div>
            }

            <div className='profile-form-component-description'>您的公開個人資料僅會顯示您的名字。</div>
          </div>

          <div>
            <label>性別</label>
            <SelectBox type='gender' value={ gender.value } errorMessage={ gender.errorMessage } />
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>出生日期</label>
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

            <div className='profile-form-component-description'>您來到這個世界的神奇日子。此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>電子郵件</label>
            <InputBox
              type='email'
              value={ email }
              disabled={ true }
            />
            <div className='profile-form-component-description'>我們不會向其他 Levely Day 用戶透露您的個人電子郵件地址。</div>
          </div>

          <div>
            <label>語言</label>
            <SelectBox type='language' value={ language.value } errorMessage={ language.errorMessage } />
            <div className='profile-form-component-description'>我們會使用此語言向您發送訊息。</div>
          </div>

          <div>
            <label>教育程度</label>
            <div className='profile-form-component-group'>
              <RadioBoxGroup
                type='educationLevel'
                selected={ educationLevel.value }
                errorMessage={ educationLevel.errorMessage }
              />
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>興趣類型</label>
            <div className='profile-form-component-group'>
              <CheckBox id='sport' value={ sport.value } errorMessage={ sport.errorMessage }>
                <label htmlFor='sport' data-element-name='sport'>運動</label>
              </CheckBox>

              <CheckBox id='handmade' value={ handmade.value } errorMessage={ handmade.errorMessage }>
                <label htmlFor='handmade' data-element-name='handmade'>手作</label>
              </CheckBox>

              <CheckBox id='baking' value={ baking.value } errorMessage={ baking.errorMessage }>
                <label htmlFor='baking' data-element-name='baking'>烘焙</label>
              </CheckBox>

              <CheckBox id='art' value={ art.value } errorMessage={ art.errorMessage }>
                <label htmlFor='art' data-element-name='art'>藝術</label>
              </CheckBox>

              <CheckBox id='history' value={ history.value } errorMessage={ history.errorMessage }>
                <label htmlFor='history' data-element-name='history'>歷史</label>
              </CheckBox>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <a className='button solid solid-theme-pink' onClick={ this.saveButton }>儲存</a>
          </div>

        </section>
      </div>
    );
  }
}

export default Profile;
