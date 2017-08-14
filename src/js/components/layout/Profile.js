import React from 'react';
import { changeFormState, hasErrorMessage } from '../../helpers/localState';
import SelectBox from '../form/SelectBox';
import InputBox from '../form/InputBox';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { firstname, lastname, gender, birthday, language, educationLevel, interest } = this.props;
    const year  = birthday.split('-')[0];
    const month = birthday.split('-')[1];
    const day   = birthday.split('-')[2];

    this.formElementEventHandler = this.formElementEventHandler.bind(this);


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
           errorMessage: ''
         },
         lastname: {
           value: lastname,
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
         interest: {
           value: !isEmpty(interest) ? interest : '',
           errorMessage: ''
         }
       }
     };
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

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { email } = this.props;
    const { firstname, lastname, gender, year, month, day, language, educationLevel, interest } = this.state.formData;

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
          </div>

          <div>
            <label>姓氏</label>
            <InputBox type='lastname' value={ lastname.value } errorMessage={ lastname.errorMessage } />
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
              <div className='radiobox form-component-theme-gray'>
                <input id='junior' type='radio' name='education-level' />
                <label htmlFor='junior' data-element-name='educationLevel'>國中</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='senior' type='radio' name='education-level' />
                <label htmlFor='senior' data-element-name='educationLevel'>高中</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='bachelor' type='radio' name='education-level' />
                <label htmlFor='bachelor' data-element-name='educationLevel'>大學</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='master' type='radio' name='education-level' />
                <label htmlFor='master' data-element-name='educationLevel'>碩士</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='doctor' type='radio' name='education-level' />
                <label htmlFor='doctor' data-element-name='educationLevel'>博士</label>
              </div>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>興趣類型</label>
            <div className='profile-form-component-group'>
              <div className='checkbox form-component-theme-gray'>
                <input id='sport' type='checkbox' />
                <label htmlFor='sport'>運動</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='handmade' type='checkbox' />
                <label htmlFor='handmade'>手作</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='baking' type='checkbox' />
                <label htmlFor='baking'>烘焙</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='camping' type='checkbox' />
                <label htmlFor='camping'>露營</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='history' type='checkbox' />
                <label htmlFor='history'>歷史</label>
              </div>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <a className='button solid solid-theme-pink' href>儲存</a>
          </div>

        </section>
      </div>
    );
  }
}

export default Profile;
