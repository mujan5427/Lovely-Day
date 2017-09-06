import React from 'react';
import { changeFormState } from '../../helpers/localState';
import { getSpecifiedPropertyOfQuerystring, isLegal } from '../../helpers/querystring';
import { toggleDisplayFilterPickerRegion, toggleDisplayFilterPickerType } from '../../actions/action';
import Experience from '../experience/Experience';
import Filter from '../button/Filter';
import FilterPicker from '../dialog/FilterPicker';
import CheckBox from '../form/CheckBox';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.formElementEventHandler          = this.formElementEventHandler.bind(this);
    this.toggleFilterPickerRegion         = this.toggleFilterPickerRegion.bind(this);
    this.toggleFilterPickerType           = this.toggleFilterPickerType.bind(this);
    this.updateFilterPickerCache          = this.updateFilterPickerCache.bind(this);
    this.resetFormDataByFilterPickerCache = this.resetFormDataByFilterPickerCache.bind(this);


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
        region_1   : { value: false, errorMessage: '' },
        region_2   : { value: false, errorMessage: '' },
        region_3   : { value: false, errorMessage: '' },
        region_4   : { value: false, errorMessage: '' },
        region_5   : { value: false, errorMessage: '' },
        region_6   : { value: false, errorMessage: '' },
        region_7   : { value: false, errorMessage: '' },
        region_8   : { value: false, errorMessage: '' },
        category_1 : { value: false, errorMessage: '' },
        category_2 : { value: false, errorMessage: '' },
        category_3 : { value: false, errorMessage: '' },
        category_4 : { value: false, errorMessage: '' },
        category_5 : { value: false, errorMessage: '' },
        category_6 : { value: false, errorMessage: '' },
        category_7 : { value: false, errorMessage: '' },
      },
      filterPickerCache: {
        region   : [],
        category : []
      }
    };
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Lifecycle Methods   *
   *                       *
   * * * * * * * * * * * * */

  componentWillMount() {
    const { location } = this.props;

    // The returned object does not have a prototype by invoking parse function.
    // So, we must create a new object and merge the original value to it.
    const parsedQueryString             = Object.assign({}, queryString.parse(location.search));
    const regionOfQuerystring           = getSpecifiedPropertyOfQuerystring(parsedQueryString, 'region');
    const categoryOfQuerystring         = getSpecifiedPropertyOfQuerystring(parsedQueryString, 'category');
    const validateRegionOfQueryString   = isLegal(regionOfQuerystring, 'region');
    const validateCategoryOfQueryString = isLegal(categoryOfQuerystring, 'category');
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  toggleFilterPickerRegion() {
    const { dispatch, displayFilterPickerRegion } = this.props;

    if(displayFilterPickerRegion) {
      this.resetFormDataByFilterPickerCache('region');

    } else {
      this.resetFormDataByFilterPickerCache('category');
      dispatch(toggleDisplayFilterPickerRegion());

    }
  }

  toggleFilterPickerType() {
    const { dispatch, displayFilterPickerType } = this.props;

    if(displayFilterPickerType) {
      this.resetFormDataByFilterPickerCache('category');

    } else {
      this.resetFormDataByFilterPickerCache('region');
      dispatch(toggleDisplayFilterPickerType());

    }
  }

  updateFilterPickerCache(type) {
    const { dispatch } = this.props;
    const formData     = this.state.formData;
    var cacheList      = [];
    var property, typeOfProperty, indexOfProperty, updatedFilterPickerCache;

    for(property in formData) {
      typeOfProperty    = property.split('_')[0];
      indexOfProperty   = property.split('_')[1];

      if(typeOfProperty === type && formData[property].value === true) {
        cacheList.push(indexOfProperty);
      }
    }

    updatedFilterPickerCache = Object.assign({}, this.state.filterPickerCache, {[type]: cacheList});

    this.setState(Object.assign({}, this.state, {filterPickerCache: updatedFilterPickerCache}));

    if(type === 'region') {
      dispatch(toggleDisplayFilterPickerRegion());

    } else if(type === 'category') {
      dispatch(toggleDisplayFilterPickerType());

    }

  }

  resetFormDataByFilterPickerCache(type) {
    const { dispatch }      = this.props;
    const formData          = this.state.formData;
    const filterPickerCache = this.state.filterPickerCache;
    var resetList           = {};
    var property, typeOfProperty, indexOfProperty, specifiedProperty, updatedFormData;

    for(property in formData) {
      typeOfProperty    = property.split('_')[0];
      indexOfProperty   = property.split('_')[1];
      specifiedProperty = `${ type }_${ indexOfProperty }`;

      if(typeOfProperty === type && filterPickerCache[type].indexOf(indexOfProperty) !== -1) {
        resetList[specifiedProperty] =
        Object.assign({}, this.state.formData[specifiedProperty], {value: true});

      } else if(typeOfProperty === type && filterPickerCache[type].indexOf(indexOfProperty) === -1) {
        resetList[specifiedProperty] =
        Object.assign({}, this.state.formData[specifiedProperty], {value: false});
      }
    }

    updatedFormData = Object.assign({}, this.state.formData, resetList);

    this.setState(Object.assign({}, this.state, {formData: updatedFormData}));

    if(type === 'region') {
      dispatch(toggleDisplayFilterPickerRegion());

    } else if(type === 'category') {
      dispatch(toggleDisplayFilterPickerType());

    }
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

        case 'category_1':
          needToModifiedState = {
            value        : !this.state.formData.category_1.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_1', needToModifiedState);
          break;

        case 'category_2':
          needToModifiedState = {
            value        : !this.state.formData.category_2.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_2', needToModifiedState);

          break;

        case 'category_3':
          needToModifiedState = {
            value        : !this.state.formData.category_3.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_3', needToModifiedState);
          break;

        case 'category_4':
          needToModifiedState = {
            value        : !this.state.formData.category_4.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_4', needToModifiedState);
          break;

        case 'category_5':
          needToModifiedState = {
            value        : !this.state.formData.category_5.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_5', needToModifiedState);
          break;

        case 'category_6':
          needToModifiedState = {
            value        : !this.state.formData.category_6.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_6', needToModifiedState);
          break;

        case 'category_7':
          needToModifiedState = {
            value        : !this.state.formData.category_7.value,
            errorMessage : ''
          };

          state  = changeFormState(this.state, 'category_7', needToModifiedState);
          break;

        default:
          break;
      }

      this.setState(state);
    }
  }

  render() {
    const { category_1, category_2, category_3, category_4, category_5, category_6, category_7 } = this.state.formData;
    const { region_1, region_2, region_3, region_4, region_5, region_6, region_7, region_8 } = this.state.formData;
    const { displayFilterPickerRegion, displayFilterPickerType } = this.props;


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
          <div
            className={ displayFilterPickerRegion ? 'filter-panel-activity' : null }
            onClick={ this.toggleFilterPickerRegion }
          >
            <label>地區</label>
            <i className='fa fa-angle-down' aria-hidden='true'></i>
          </div>

          <div
            className={ displayFilterPickerType ? 'filter-panel-activity' : null }
            onClick={ this.toggleFilterPickerType }
          >
            <label>類型</label>
            <i className='fa fa-angle-down' aria-hidden='true'></i>
          </div>
        </section>

        {/* Filter Picker for region */}
        { displayFilterPickerRegion &&
          <div
            className='filter-picker-region'
            onChange={ this.formElementEventHandler }
            onClick={ this.formElementEventHandler }
          >
            <FilterPicker
              type='region'
              cancelHandler={ this.resetFormDataByFilterPickerCache }
              confirmHandler={ this.updateFilterPickerCache }
            >
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
        }

        {/* Filter Picker for category */}
        { displayFilterPickerType &&
          <div
            className='filter-picker-category'
            onChange={ this.formElementEventHandler }
            onClick={ this.formElementEventHandler }
          >
            <FilterPicker
              type='category'
              cancelHandler={ this.resetFormDataByFilterPickerCache }
              confirmHandler={ this.updateFilterPickerCache }
            >
              <CheckBox id='category_1' value={ category_1.value } errorMessage={ category_1.errorMessage }>
                <label htmlFor='category_1' data-element-name='category_1'>夏令營專區</label>
              </CheckBox>
              <CheckBox id='category_2' value={ category_2.value } errorMessage={ category_2.errorMessage }>
                <label htmlFor='category_2' data-element-name='category_2'>藝文手作</label>
              </CheckBox>
              <CheckBox id='category_3' value={ category_3.value } errorMessage={ category_3.errorMessage }>
                <label htmlFor='category_3' data-element-name='category_3'>玩樂廚房</label>
              </CheckBox>
              <CheckBox id='category_4' value={ category_4.value } errorMessage={ category_4.errorMessage }>
                <label htmlFor='category_4' data-element-name='category_4'>愛上戶外</label>
              </CheckBox>
              <CheckBox id='category_5' value={ category_5.value } errorMessage={ category_5.errorMessage }>
                <label htmlFor='category_5' data-element-name='category_5'>親子專區</label>
              </CheckBox>
              <CheckBox id='category_6' value={ category_6.value } errorMessage={ category_6.errorMessage }>
                <label htmlFor='category_6' data-element-name='category_6'>團體遊戲</label>
              </CheckBox>
              <CheckBox id='category_7' value={ category_7.value } errorMessage={ category_7.errorMessage }>
                <label htmlFor='category_7' data-element-name='category_7'>情人專區</label>
              </CheckBox>
            </FilterPicker>
          </div>
        }

      </div>
    );
  }
}

export default Search;
