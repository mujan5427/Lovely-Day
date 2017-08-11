import React from 'react';


class SelectBox extends React.Component {
  constructor(props) {
    super(props);

    this.chooseOptionListByType = this.chooseOptionListByType.bind(this);
  }

  chooseOptionListByType() {
    const { type } = this.props;

    switch(type) {
      case 'day':
        return this.generateDayOptionList();

      case 'month':
        return this.generateMonthOptionList();

      case 'year':
        return this.generateYearOptionList();

      default:
        break;
    }
  }

  generateDayOptionList() {
    var start      = 1;
    var end        = 31;
    var optionList = [];

    optionList.push(<option disabled value=''>日</option>);

    for(start; start <= end; start++) {
      optionList.push(<option value={ start.toString() }>{ start.toString() }</option>);
    }

    return optionList;
  }

  generateMonthOptionList() {
    var start                = 1;
    var end                  = 12;
    var characterMappingList = ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'];

    var optionList = [];

    optionList.push(<option disabled value=''>月</option>);

    for(start; start <= end; start++) {
      optionList.push(
        <option value={ start.toString() }>{ characterMappingList[start-1].toString() }</option>
      );
    }

    return optionList;
  }

  generateYearOptionList() {
    var start           = 1927;
    var end             = 1999;
    var optionList      = [];
    var optionListTitle = [<option disabled value=''>年</option>];

    for(start; start <= end; start++) {
      optionList.push(<option value={ start.toString() }>{ start.toString() }</option>);
    }

    optionList.reverse();
    optionList = optionListTitle.concat(optionList);

    return optionList;
  }

  render() {
    const { type, value, errorMessage } = this.props;

    return (
      <div className='selectbox'>
        <select
          className={ !isEmpty(errorMessage) ? 'form-component-theme-orange' : 'form-component-theme-gray' }
          data-element-name={ type }
          value={ value }
        >
          { this.chooseOptionListByType() }
        </select>
      </div>
    );
  }
}

export default SelectBox;
