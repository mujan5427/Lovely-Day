import React from 'react';
import { changeFormState } from '../../helpers/localState';
import Experience from '../experience/Experience';
import Filter from '../button/Filter';
import FilterPicker from '../dialog/FilterPicker';
import CheckBox from '../form/CheckBox';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.formElementEventHandler = this.formElementEventHandler.bind(this);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    /* value          : practical value of form elements.
     * errorMessage   : just error message. if it have
     */

    this.state = {
      formData: {
        region_1 : { value: false, errorMessage: '' },
        region_2 : { value: false, errorMessage: '' },
        region_3 : { value: false, errorMessage: '' },
        region_4 : { value: false, errorMessage: '' },
        region_5 : { value: false, errorMessage: '' },
        region_6 : { value: false, errorMessage: '' },
        region_7 : { value: false, errorMessage: '' },
        region_8 : { value: false, errorMessage: '' },
        type_1   : { value: false, errorMessage: '' },
        type_2   : { value: false, errorMessage: '' },
        type_3   : { value: false, errorMessage: '' },
        type_4   : { value: false, errorMessage: '' },
        type_5   : { value: false, errorMessage: '' },
        type_6   : { value: false, errorMessage: '' },
        type_7   : { value: false, errorMessage: '' },
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
        case 'region_1':
          needToModifiedState = {
            value        : !this.state.formData.region_1.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_1', needToModifiedState);
          break;

        case 'region_2':
          needToModifiedState = {
            value        : !this.state.formData.region_2.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_2', needToModifiedState);
          break;

        case 'region_3':
          needToModifiedState = {
            value        : !this.state.formData.region_3.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_3', needToModifiedState);
          break;

        case 'region_4':
          needToModifiedState = {
            value        : !this.state.formData.region_4.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_4', needToModifiedState);
          break;

        case 'region_5':
          needToModifiedState = {
            value        : !this.state.formData.region_5.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_5', needToModifiedState);
          break;

        case 'region_6':
          needToModifiedState = {
            value        : !this.state.formData.region_6.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_6', needToModifiedState);
          break;

        case 'region_7':
          needToModifiedState = {
            value        : !this.state.formData.region_7.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_7', needToModifiedState);
          break;

        case 'region_8':
          needToModifiedState = {
            value        : !this.state.formData.region_8.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'region_8', needToModifiedState);
          break;

        case 'type_1':
          needToModifiedState = {
            value        : !this.state.formData.type_1.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_1', needToModifiedState);
          break;

        case 'type_2':
          needToModifiedState = {
            value        : !this.state.formData.type_2.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_2', needToModifiedState);

          break;

        case 'type_3':
          needToModifiedState = {
            value        : !this.state.formData.type_3.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_3', needToModifiedState);
          break;

        case 'type_4':
          needToModifiedState = {
            value        : !this.state.formData.type_4.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_4', needToModifiedState);
          break;

        case 'type_5':
          needToModifiedState = {
            value        : !this.state.formData.type_5.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_5', needToModifiedState);
          break;

        case 'type_6':
          needToModifiedState = {
            value        : !this.state.formData.type_6.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_6', needToModifiedState);
          break;

        case 'type_7':
          needToModifiedState = {
            value        : !this.state.formData.type_7.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'type_7', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { type_1, type_2, type_3, type_4, type_5, type_6, type_7 } = this.state.formData;
    const { region_1, region_2, region_3, region_4, region_5, region_6, region_7, region_8 } = this.state.formData;


    return (
      <div>
        <div className='content'>
          <section className='search-experience-list-panel'>

            {/* loop Experience component in this line */}
            {/* <Experience /> */}
          </section>
          <Filter />
        </div>

        {/* Filter Panel */}
        <section className='search-filter-panel'>
          <div>
            <label>地區</label>
            <i className='fa fa-angle-down' aria-hidden='true'></i>
          </div>
          <div>
            <label>類型</label>
            <i className='fa fa-angle-down' aria-hidden='true'></i>
          </div>
        </section>

        {/* Filter Picker for region */}
        <div
          className='filter-picker-region'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          <FilterPicker>
            <CheckBox id='region_1' value={ region_1.value } errorMessage={ region_1.errorMessage }>
              <label htmlFor='region_1' data-element-name='region_1'>大台北</label>
            </CheckBox>
            <CheckBox id='region_2' value={ region_2.value } errorMessage={ region_2.errorMessage }>
              <label htmlFor='region_2' data-element-name='region_2'>桃竹苗</label>
            </CheckBox>
            <CheckBox id='region_3' value={ region_3.value } errorMessage={ region_3.errorMessage }>
              <label htmlFor='region_3' data-element-name='region_3'>宜蘭</label>
            </CheckBox>
            <CheckBox id='region_4' value={ region_4.value } errorMessage={ region_4.errorMessage }>
              <label htmlFor='region_4' data-element-name='region_4'>中彰投</label>
            </CheckBox>
            <CheckBox id='region_5' value={ region_5.value } errorMessage={ region_5.errorMessage }>
              <label htmlFor='region_5' data-element-name='region_5'>雲嘉南</label>
            </CheckBox>
            <CheckBox id='region_6' value={ region_6.value } errorMessage={ region_6.errorMessage }>
              <label htmlFor='region_6' data-element-name='region_6'>高屏</label>
            </CheckBox>
            <CheckBox id='region_7' value={ region_7.value } errorMessage={ region_7.errorMessage }>
              <label htmlFor='region_7' data-element-name='region_7'>花東</label>
            </CheckBox>
            <CheckBox id='region_8' value={ region_8.value } errorMessage={ region_8.errorMessage }>
              <label htmlFor='region_8' data-element-name='region_8'>離島</label>
            </CheckBox>
          </FilterPicker>
        </div>

        {/* Filter Picker for type */}
        <div
          className='filter-picker-type'
          onChange={ this.formElementEventHandler }
          onClick={ this.formElementEventHandler }
        >
          <FilterPicker>
            <CheckBox id='type_1' value={ type_1.value } errorMessage={ type_1.errorMessage }>
              <label htmlFor='type_1' data-element-name='type_1'>夏令營專區</label>
            </CheckBox>
            <CheckBox id='type_2' value={ type_2.value } errorMessage={ type_2.errorMessage }>
              <label htmlFor='type_2' data-element-name='type_2'>藝文手作</label>
            </CheckBox>
            <CheckBox id='type_3' value={ type_3.value } errorMessage={ type_3.errorMessage }>
              <label htmlFor='type_3' data-element-name='type_3'>玩樂廚房</label>
            </CheckBox>
            <CheckBox id='type_4' value={ type_4.value } errorMessage={ type_4.errorMessage }>
              <label htmlFor='type_4' data-element-name='type_4'>愛上戶外</label>
            </CheckBox>
            <CheckBox id='type_5' value={ type_5.value } errorMessage={ type_5.errorMessage }>
              <label htmlFor='type_5' data-element-name='type_5'>親子專區</label>
            </CheckBox>
            <CheckBox id='type_6' value={ type_6.value } errorMessage={ type_6.errorMessage }>
              <label htmlFor='type_6' data-element-name='type_6'>團體遊戲</label>
            </CheckBox>
            <CheckBox id='type_7' value={ type_7.value } errorMessage={ type_7.errorMessage }>
              <label htmlFor='type_7' data-element-name='type_7'>情人專區</label>
            </CheckBox>
          </FilterPicker>
        </div>

      </div>
    );
  }
}

export default Search;
