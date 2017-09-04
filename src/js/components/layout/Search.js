import React from 'react';
import Experience from '../experience/Experience';
import Filter from '../button/Filter';
import FilterPicker from '../dialog/FilterPicker';
import CheckBox from '../form/CheckBox';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        <div className='filter-picker-region'>
          <FilterPicker>
            <CheckBox id='region-1'>
              <label htmlFor='region-1' data-element-name='region-1'>大台北</label>
            </CheckBox>
            <CheckBox id='region-2'>
              <label htmlFor='region-2' data-element-name='region-2'>桃竹苗</label>
            </CheckBox>
            <CheckBox id='region-3'>
              <label htmlFor='region-3' data-element-name='region-3'>宜蘭</label>
            </CheckBox>
            <CheckBox id='region-4'>
              <label htmlFor='region-4' data-element-name='region-4'>中彰投</label>
            </CheckBox>
            <CheckBox id='region-5'>
              <label htmlFor='region-5' data-element-name='region-5'>雲嘉南</label>
            </CheckBox>
            <CheckBox id='region-6'>
              <label htmlFor='region-6' data-element-name='region-6'>高屏</label>
            </CheckBox>
            <CheckBox id='region-7'>
              <label htmlFor='region-7' data-element-name='region-7'>花東</label>
            </CheckBox>
            <CheckBox id='region-8'>
              <label htmlFor='region-8' data-element-name='region-8'>離島</label>
            </CheckBox>
          </FilterPicker>
        </div>

        {/* Filter Picker for type */}
        <div className='filter-picker-type'>
          <FilterPicker>
            <CheckBox id='type-1'>
              <label htmlFor='type-1' data-element-name='type-1'>夏令營專區</label>
            </CheckBox>
            <CheckBox id='type-2'>
              <label htmlFor='type-2' data-element-name='type-2'>藝文手作</label>
            </CheckBox>
            <CheckBox id='type-3'>
              <label htmlFor='type-3' data-element-name='type-3'>玩樂廚房</label>
            </CheckBox>
            <CheckBox id='type-4'>
              <label htmlFor='type-4' data-element-name='type-4'>愛上戶外</label>
            </CheckBox>
            <CheckBox id='type-5'>
              <label htmlFor='type-5' data-element-name='type-5'>親子專區</label>
            </CheckBox>
            <CheckBox id='type-6'>
              <label htmlFor='type-6' data-element-name='type-6'>團體遊戲</label>
            </CheckBox>
            <CheckBox id='type-7'>
              <label htmlFor='type-7' data-element-name='type-7'>情人專區</label>
            </CheckBox>
          </FilterPicker>
        </div>

      </div>
    );
  }
}

export default Search;
