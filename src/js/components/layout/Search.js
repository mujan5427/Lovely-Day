import React from 'react';
import Experience from '../experience/Experience';
import Filter from '../button/Filter';

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

        {/* Picker of Filter for region */}
        <div className='search-filter-picker-background'>
          <div className='search-filter-picker-box filter-picker-region'>
            <section>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-1' type='checkbox' />
                <label htmlFor='region-1'>大台北</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-2' type='checkbox' />
                <label htmlFor='region-2'>桃竹苗</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-3' type='checkbox' />
                <label htmlFor='region-3'>宜蘭</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-4' type='checkbox' />
                <label htmlFor='region-4'>中彰投</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-5' type='checkbox' />
                <label htmlFor='region-5'>雲嘉南</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-6' type='checkbox' />
                <label htmlFor='region-6'>高屏</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-7' type='checkbox' />
                <label htmlFor='region-7'>花東</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='region-8' type='checkbox' />
                <label htmlFor='region-8'>離島</label>
              </div>
            </section>

            <section>
              <a href>取消</a>
              <a className='href-highlight' href>確定</a>
            </section>
          </div>
        </div>

        {/* Filter Picker for type */}
        <div className='search-filter-picker-background'>
          <div className='search-filter-picker-box filter-picker-type'>
            <section>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-1' type='checkbox' />
                <label htmlFor='type-1'>南澳生活節</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-2' type='checkbox' />
                <label htmlFor='type-2'>夏令營專區</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-3' type='checkbox' />
                <label htmlFor='type-3'>藝文手作</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-4' type='checkbox' />
                <label htmlFor='type-4'>玩樂廚房</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-5' type='checkbox' />
                <label htmlFor='type-5'>愛上戶外</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-6' type='checkbox' />
                <label htmlFor='type-6'>親子專區</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='type-7' type='checkbox' />
                <label htmlFor='type-7'>情人專區</label>
              </div>
            </section>
            <section>
              <a href>取消</a>
              <a className='href-highlight' href>確定</a>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
