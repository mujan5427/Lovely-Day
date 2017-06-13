import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='button-filters-wrapper'>
        <a href>
          <div className='button-filters'>
            <span>篩選條件</span>
            <i className='fa fa-sliders' aria-hidden='true'></i>
          </div>
        </a>
      </div>
    );
  }
}

export default Filter;
