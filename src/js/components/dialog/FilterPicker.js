import React from 'react';

class FilterPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className='filter-picker-background'>
        <div className='filter-picker-box'>
          <section>
            { children }
          </section>

          <section>
            <a>取消</a>
            <a>確定</a>
          </section>
        </div>
      </div>
    );
  }
}

export default FilterPicker;
