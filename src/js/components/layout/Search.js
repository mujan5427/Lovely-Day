import React from 'react';
import { changeFormState } from '../../helpers/localState';
import { getSpecifiedPropertyOfQuerystring, isLegal, createHistoryStack } from '../../helpers/querystring';
import { toggleDisplayFilterPickerRegion, toggleDisplayFilterPickerType } from '../../actions/action';
import Experience from '../experience/Experience';
import FilterPicker from '../dialog/FilterPicker';
import CheckBox from '../form/CheckBox';
import Filter from '../dialog/Filter';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.formElementEventHandler                     = this.formElementEventHandler.bind(this);
    this.toggleFilterPickerRegion                    = this.toggleFilterPickerRegion.bind(this);
    this.toggleFilterPickerType                      = this.toggleFilterPickerType.bind(this);
    this.confirmButtonOfFilterPickerOfDesktopVersion = this.confirmButtonOfFilterPickerOfDesktopVersion.bind(this);
    this.confirmButtonOfFilterPickerOfMobileVersion  = this.confirmButtonOfFilterPickerOfMobileVersion.bind(this);
    this.cancelButtonOfFilterPickerOfDesktopVersion  = this.cancelButtonOfFilterPickerOfDesktopVersion.bind(this);
    this.cancelButtonOfFilterPickerOfMobileVersion   = this.cancelButtonOfFilterPickerOfMobileVersion.bind(this);
    this.localStateFromQuerystring                   = this.localStateFromQuerystring.bind(this);
    this.updateFilterPickerCache                     = this.updateFilterPickerCache.bind(this);
    this.resetFormDataByFilterPickerCache            = this.resetFormDataByFilterPickerCache.bind(this);
    this.cleanFormData                               = this.cleanFormData.bind(this);


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

  componentDidMount() {
    const { location } = this.props;

    // The returned object does not have a prototype by invoking parse function.
    // So, we must create a new object and merge the original value to it.
    const parsedQueryString         = Object.assign({}, queryString.parse(location.search));
    const regionOfQuerystring       = getSpecifiedPropertyOfQuerystring(parsedQueryString, 'region');
    const categoryOfQuerystring     = getSpecifiedPropertyOfQuerystring(parsedQueryString, 'category');
    const locatStateFromQuerystring = this.localStateFromQuerystring(regionOfQuerystring, categoryOfQuerystring);

    if(isEmpty(regionOfQuerystring) && isEmpty(categoryOfQuerystring)) {
      // fetching data directly without 'region' or 'category' property.

    } else {
      this.setState(locatStateFromQuerystring);

    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { history } = nextProps;
    const previousFilterPickerCache = this.state.filterPickerCache;
    const currentFilterPickerCache  = nextState.filterPickerCache;
    var needDisplayedQuerystring = '', historyStack;

    // Note that you cannot call this.setState() here.

    if(!objectEqual(currentFilterPickerCache, previousFilterPickerCache)) {
      // fetching data with 'region' or 'category' property.


      // change history stack here by using `history.push()`.
      needDisplayedQuerystring = queryString.stringify(
        {
          region: !isEmpty(currentFilterPickerCache.region) ? currentFilterPickerCache.region : undefined,
          category: !isEmpty(currentFilterPickerCache.category) ? currentFilterPickerCache.category : undefined
        });

      historyStack = createHistoryStack('search', needDisplayedQuerystring);

      history.push(historyStack);
    }
  }

  componentWillUnmount() {}


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  toggleFilterPickerRegion() {
    const { dispatch, displayFilterPickerRegion } = this.props;

    if(displayFilterPickerRegion) {
      this.cancelButtonOfFilterPickerOfDesktopVersion('region');

    } else {
      this.cancelButtonOfFilterPickerOfDesktopVersion('category');
      dispatch(toggleDisplayFilterPickerRegion());

    }
  }

  toggleFilterPickerType() {
    const { dispatch, displayFilterPickerType } = this.props;

    if(displayFilterPickerType) {
      this.cancelButtonOfFilterPickerOfDesktopVersion('category');

    } else {
      this.cancelButtonOfFilterPickerOfDesktopVersion('region');
      dispatch(toggleDisplayFilterPickerType());

    }
  }

  localStateFromQuerystring(region, category) {
    var updatedRegion = {}, updatedCategory = {}, updatedFormData, updatedFilterPickerCache = {};
    var waitForUpdatedState;

    // produce new local state for `region`
    if(!isEmpty(region) && Array.isArray(region)) {
      region.map(item => {
        updatedRegion[`region_${ item }`] = { value: true, errorMessage: '' };
      });

      updatedFilterPickerCache.region = region;
    }

    // produce new local state for `category`
    if(!isEmpty(category) && Array.isArray(category)) {
      category.map(item => {
        updatedCategory[`category_${ item }`] = { value: true, errorMessage: '' };
      });

      updatedFilterPickerCache.category = category;
    }

    // merge `formData` of local state with data of querystring
    updatedFormData          = Object.assign({}, updatedRegion, updatedCategory);
    updatedFormData          = Object.assign({}, this.state.formData, updatedFormData);

    // merge `filterPickerCache` of local state with data of querystring
    updatedFilterPickerCache = Object.assign({}, updatedFilterPickerCache);
    updatedFilterPickerCache = Object.assign({}, this.state.filterPickerCache, updatedFilterPickerCache);

    // merge updated `formData` with updated `filterPickerCache` as new local state
    waitForUpdatedState      = Object.assign({}, {formData: updatedFormData}, {filterPickerCache: updatedFilterPickerCache});

    return waitForUpdatedState;
  }

  confirmButtonOfFilterPickerOfDesktopVersion(type) {
    const { dispatch } = this.props;

    this.updateFilterPickerCache();

    if(type === 'region') {
      dispatch(toggleDisplayFilterPickerRegion());

    } else if(type === 'category') {
      dispatch(toggleDisplayFilterPickerType());

    }

  }

  confirmButtonOfFilterPickerOfMobileVersion() {
    this.updateFilterPickerCache();
  }

  cancelButtonOfFilterPickerOfDesktopVersion(type) {
    const { dispatch } = this.props;

    this.resetFormDataByFilterPickerCache();

    if(type === 'region') {
      dispatch(toggleDisplayFilterPickerRegion());

    } else if(type === 'category') {
      dispatch(toggleDisplayFilterPickerType());

    }
  }

  cancelButtonOfFilterPickerOfMobileVersion() {
    this.resetFormDataByFilterPickerCache();
  }

  resetFormDataByFilterPickerCache() {
    const { formData, filterPickerCache } = this.state;
    var resetList = {};
    var property, typeOfProperty, indexOfProperty, updatedFormData;

    for(property in formData) {
      typeOfProperty    = property.split('_')[0];
      indexOfProperty   = property.split('_')[1];

      switch(typeOfProperty) {
        case 'region':
          if(filterPickerCache.region.indexOf(indexOfProperty) !== -1) {
            resetList[property] = Object.assign({}, formData[property], {value: true});

          } else {
            resetList[property] = Object.assign({}, formData[property], {value: false});

          }
          break;

        case 'category':
          if(filterPickerCache.category.indexOf(indexOfProperty) !== -1) {
            resetList[property] = Object.assign({}, formData[property], {value: true});

          } else {
            resetList[property] = Object.assign({}, formData[property], {value: false});

          }
          break;

        default:
          break;
      }
    }

    updatedFormData = Object.assign({}, formData, resetList);

    this.setState(Object.assign({}, this.state, {formData: updatedFormData}));
  }

  updateFilterPickerCache() {
    const { formData, filterPickerCache } = this.state;
    var regionCacheList   = [];
    var categoryCacheList = [];
    var property, typeOfProperty, indexOfProperty, updatedFilterPickerCache;

    for(property in formData) {
      typeOfProperty    = property.split('_')[0];
      indexOfProperty   = property.split('_')[1];

      if(typeOfProperty === 'region' && formData[property].value === true) {
        regionCacheList.push(indexOfProperty);

      }

      if(typeOfProperty === 'category' && formData[property].value === true) {
        categoryCacheList.push(indexOfProperty);

      }
    }

    updatedFilterPickerCache =
    Object.assign({}, filterPickerCache, {region: regionCacheList, category: categoryCacheList});

    this.setState(Object.assign({}, this.state, {filterPickerCache: updatedFilterPickerCache}));
  }

  cleanFormData() {
    const { formData } = this.state;
    var cleanList = {};
    var property, cleanedFormData;

    for(property in formData) {
      cleanList[property] = Object.assign({}, formData[property], {value: false});
    }

    cleanedFormData = Object.assign({}, formData, cleanList);

    this.setState(Object.assign({}, this.state, {formData: cleanedFormData}));
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
        </div>

        {/* Filter Panel of desktop version */}
        <section className='search-filter-panel-desktop-version'>
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
              cancelHandler={ this.cancelButtonOfFilterPickerOfDesktopVersion }
              confirmHandler={ this.confirmButtonOfFilterPickerOfDesktopVersion }
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
              cancelHandler={ this.cancelButtonOfFilterPickerOfDesktopVersion }
              confirmHandler={ this.confirmButtonOfFilterPickerOfDesktopVersion }
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

        {/* Filter Panel of mobile version */}
        <div className='search-filter-panel-mobile-version'>
          <a className='skeuomorphism-button'>
            <span>篩選條件</span>
            <i className='fa fa-sliders' aria-hidden='true'></i>
          </a>
        </div>

        {/* Filter Picker of mobile version */}
        <Filter
          resetButton={ this.cleanFormData }
          cancelButton={ this.cancelButtonOfFilterPickerOfMobileVersion }
          confirmButton={ this.confirmButtonOfFilterPickerOfMobileVersion }
        >
          <div
            className='search-filter-picker-dialog-content'
            onChange={ this.formElementEventHandler }
            onClick={ this.formElementEventHandler }
          >

            {/* Filter Picker for region */}
            <section>
              <h1>地區</h1>
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
            </section>

            {/* Filter Picker for category */}
            <section>
              <h1>類型</h1>
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
            </section>
          </div>
        </Filter>
      </div>
    );
  }
}

export default Search;
