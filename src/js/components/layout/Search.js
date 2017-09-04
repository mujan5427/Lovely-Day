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
        taipeiNewTaipei        : { value: false, errorMessage: '' },
        taoyuanHsinchuMiaoli   : { value: false, errorMessage: '' },
        ilan                   : { value: false, errorMessage: '' },
        taichungChanghuaNantou : { value: false, errorMessage: '' },
        yunlinChiayiTainan     : { value: false, errorMessage: '' },
        kaohsiungPingtung      : { value: false, errorMessage: '' },
        hualienTaito           : { value: false, errorMessage: '' },
        outlyingIslands        : { value: false, errorMessage: '' },
        summerCamp             : { value: false, errorMessage: '' },
        handMade               : { value: false, errorMessage: '' },
        baking                 : { value: false, errorMessage: '' },
        outdoor                : { value: false, errorMessage: '' },
        playWithChild          : { value: false, errorMessage: '' },
        group                  : { value: false, errorMessage: '' },
        lover                  : { value: false, errorMessage: '' },
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
        case 'region-1':
          needToModifiedState = {
            value        : !this.state.formData.taipeiNewTaipei.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'taipeiNewTaipei', needToModifiedState);
          break;

        case 'region-2':
          needToModifiedState = {
            value        : !this.state.formData.taoyuanHsinchuMiaoli.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'taoyuanHsinchuMiaoli', needToModifiedState);
          break;

        case 'region-3':
          needToModifiedState = {
            value        : !this.state.formData.ilan.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'ilan', needToModifiedState);
          break;

        case 'region-4':
          needToModifiedState = {
            value        : !this.state.formData.taichungChanghuaNantou.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'taichungChanghuaNantou', needToModifiedState);
          break;

        case 'region-5':
          needToModifiedState = {
            value        : !this.state.formData.yunlinChiayiTainan.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'yunlinChiayiTainan', needToModifiedState);
          break;

        case 'region-6':
          needToModifiedState = {
            value        : !this.state.formData.kaohsiungPingtung.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'kaohsiungPingtung', needToModifiedState);
          break;

        case 'region-7':
          needToModifiedState = {
            value        : !this.state.formData.hualienTaito.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'hualienTaito', needToModifiedState);
          break;

        case 'region-8':
          needToModifiedState = {
            value        : !this.state.formData.outlyingIslands.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'outlyingIslands', needToModifiedState);
          break;

        case 'type-1':
          needToModifiedState = {
            value        : !this.state.formData.summerCamp.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'summerCamp', needToModifiedState);
          break;

        case 'type-2':
          needToModifiedState = {
            value        : !this.state.formData.handMade.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'handMade', needToModifiedState);

          break;

        case 'type-3':
          needToModifiedState = {
            value        : !this.state.formData.baking.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'baking', needToModifiedState);
          break;

        case 'type-4':
          needToModifiedState = {
            value        : !this.state.formData.outdoor.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'outdoor', needToModifiedState);
          break;

        case 'type-5':
          needToModifiedState = {
            value        : !this.state.formData.playWithChild.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'playWithChild', needToModifiedState);
          break;

        case 'type-6':
          needToModifiedState = {
            value        : !this.state.formData.group.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'group', needToModifiedState);
          break;

        case 'type-7':
          needToModifiedState = {
            value        : !this.state.formData.lover.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'lover', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { summerCamp, handMade, baking, outdoor, playWithChild, group, lover } = this.state.formData;
    const { taipeiNewTaipei, taoyuanHsinchuMiaoli, ilan, taichungChanghuaNantou, yunlinChiayiTainan, kaohsiungPingtung, hualienTaito, outlyingIslands } = this.state.formData;


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
            <CheckBox id='region-1' value={ taipeiNewTaipei.value } errorMessage={ taipeiNewTaipei.errorMessage }>
              <label htmlFor='region-1' data-element-name='region-1'>大台北</label>
            </CheckBox>
            <CheckBox id='region-2' value={ taoyuanHsinchuMiaoli.value } errorMessage={ taoyuanHsinchuMiaoli.errorMessage }>
              <label htmlFor='region-2' data-element-name='region-2'>桃竹苗</label>
            </CheckBox>
            <CheckBox id='region-3' value={ ilan.value } errorMessage={ ilan.errorMessage }>
              <label htmlFor='region-3' data-element-name='region-3'>宜蘭</label>
            </CheckBox>
            <CheckBox id='region-4' value={ taichungChanghuaNantou.value } errorMessage={ taichungChanghuaNantou.errorMessage }>
              <label htmlFor='region-4' data-element-name='region-4'>中彰投</label>
            </CheckBox>
            <CheckBox id='region-5' value={ yunlinChiayiTainan.value } errorMessage={ yunlinChiayiTainan.errorMessage }>
              <label htmlFor='region-5' data-element-name='region-5'>雲嘉南</label>
            </CheckBox>
            <CheckBox id='region-6' value={ kaohsiungPingtung.value } errorMessage={ kaohsiungPingtung.errorMessage }>
              <label htmlFor='region-6' data-element-name='region-6'>高屏</label>
            </CheckBox>
            <CheckBox id='region-7' value={ hualienTaito.value } errorMessage={ hualienTaito.errorMessage }>
              <label htmlFor='region-7' data-element-name='region-7'>花東</label>
            </CheckBox>
            <CheckBox id='region-8' value={ outlyingIslands.value } errorMessage={ outlyingIslands.errorMessage }>
              <label htmlFor='region-8' data-element-name='region-8'>離島</label>
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
            <CheckBox id='type-1' value={ summerCamp.value } errorMessage={ summerCamp.errorMessage }>
              <label htmlFor='type-1' data-element-name='type-1'>夏令營專區</label>
            </CheckBox>
            <CheckBox id='type-2' value={ handMade.value } errorMessage={ handMade.errorMessage }>
              <label htmlFor='type-2' data-element-name='type-2'>藝文手作</label>
            </CheckBox>
            <CheckBox id='type-3' value={ baking.value } errorMessage={ baking.errorMessage }>
              <label htmlFor='type-3' data-element-name='type-3'>玩樂廚房</label>
            </CheckBox>
            <CheckBox id='type-4' value={ outdoor.value } errorMessage={ outdoor.errorMessage }>
              <label htmlFor='type-4' data-element-name='type-4'>愛上戶外</label>
            </CheckBox>
            <CheckBox id='type-5' value={ playWithChild.value } errorMessage={ playWithChild.errorMessage }>
              <label htmlFor='type-5' data-element-name='type-5'>親子專區</label>
            </CheckBox>
            <CheckBox id='type-6' value={ group.value } errorMessage={ group.errorMessage }>
              <label htmlFor='type-6' data-element-name='type-6'>團體遊戲</label>
            </CheckBox>
            <CheckBox id='type-7' value={ lover.value } errorMessage={ lover.errorMessage }>
              <label htmlFor='type-7' data-element-name='type-7'>情人專區</label>
            </CheckBox>
          </FilterPicker>
        </div>

      </div>
    );
  }
}

export default Search;
