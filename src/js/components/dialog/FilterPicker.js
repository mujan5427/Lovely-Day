import React from 'react';

class FilterPicker extends React.Component {
  constructor(props) {
    super(props);

    this.cancelClickHandler  = this.cancelClickHandler.bind(this);
    this.confirmClickHandler = this.confirmClickHandler.bind(this);
  }

  cancelClickHandler() {
    const { type, cancelHandler } = this.props;

    cancelHandler(type);
  }

  confirmClickHandler() {
    const { type, confirmHandler } = this.props;

    confirmHandler(type);
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
            <a onClick={ this.cancelClickHandler }>取消</a>
            <a onClick={ this.confirmClickHandler }>確定</a>
          </section>
        </div>
      </div>
    );
  }
}

export default FilterPicker;
