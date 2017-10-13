import React from 'react';

class SingleDatePicker extends React.Component {
  constructor (props) {
    super(props);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      selectedDay         : undefined,
      openDaysOfThisMonth : {}
    };


    /* * * * * * * * * * * * *
     *                       *
     *    Global Veriable    *
     *                       *
     * * * * * * * * * * * * */

    this.currentDate = new Date();


    /* * * * * * * * * * * * *
     *                       *
     *    Method Binding     *
     *                       *
     * * * * * * * * * * * * */

    this.generateDayLabelList   = this.generateDayLabelList.bind(this);
    this.getYear                = this.getYear.bind(this);
    this.getMonth               = this.getMonth.bind(this);
    this.lastMonthButtonHandler = this.lastMonthButtonHandler.bind(this);
    this.nextMonthButtonHandler = this.nextMonthButtonHandler.bind(this);
    this.generateQuotaList      = this.generateQuotaList.bind(this);
    this.selectDayLabelHandler  = this.selectDayLabelHandler.bind(this);
    this.resetLocalState        = this.resetLocalState.bind(this);
    this.initialization         = this.initialization.bind(this);
  }


  /* * * * * * * * * * * * *
   *                       *
   *   Life Cycle Methods  *
   *                       *
   * * * * * * * * * * * * */

  componentDidMount() {
    this.initialization();
  }

  componentWillReceiveProps(nextProps) {
    const current  = nextProps;
    const previous = this.props;

    // If `currentPage` props is changed, reset the local state and global variable.
    if(previous.currentPage !== current.currentPage) {
      this.resetLocalState();
      this.currentDate = new Date();
    }

    if(this.localStateIsReseted(this.state)) {
      this.initialization();
    }
  }


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  initialization() {
    const year  = this.currentDate.getUTCFullYear();
    const month = this.currentDate.getUTCMonth();
    var needToBeModifiedState;


    needToBeModifiedState = {openDaysOfThisMonth: this.generateQuotaList(year, month)};
    needToBeModifiedState = Object.assign({}, this.state, needToBeModifiedState);

    this.setState(needToBeModifiedState);
  }

  resetLocalState() {
    const defaultValueOfLocalState = {
      selectedDay         : undefined,
      openDaysOfThisMonth : {}
    };

    this.setState(defaultValueOfLocalState);
  }

  localStateIsReseted(currentLocalState) {
    const defaultValueOfLocalState = {
      selectedDay         : undefined,
      openDaysOfThisMonth : {}
    };

    return objectEqual(currentLocalState, defaultValueOfLocalState)
  }

  generateDayLabelList() {
    const { selectedDay, openDaysOfThisMonth } = this.state;
    const year                        = this.currentDate.getUTCFullYear();
    const month                       = this.currentDate.getUTCMonth();
    const totalDaysInMonth            = this.getDaysInMonth(year, month);
    const weekdayOfFirstDayOfTheMonth = this.getWeekdayByDate(year, month, 1);
    const totalCount                  = totalDaysInMonth
    var startCount                    = 1;
    var dayLabelList                  = [];
    var activeDayLabel, disableDayLabel, oneDayOfThisMonth;


    if(!isEmpty(weekdayOfFirstDayOfTheMonth)) {

      for(startCount; startCount <= weekdayOfFirstDayOfTheMonth; startCount++) {
        dayLabelList.push(<label key={`placeholder-item-${ startCount }`}></label>);
      }

      startCount = 1;
    }

    if(!isEmpty(totalCount)) {
      for(startCount; startCount <= totalCount; startCount++) {

        // transform specified day to timestamp
        oneDayOfThisMonth = Date.UTC(year, month, startCount);

        // active day label
        if(openDaysOfThisMonth.hasOwnProperty(oneDayOfThisMonth) && oneDayOfThisMonth === selectedDay) {
          activeDayLabel =
           <label
             key={`displayed-item-${ startCount }`}
             className='day-label-activity day-label-selected'
           >
             { startCount }
           </label>;

          dayLabelList.push(activeDayLabel);

        } else if(openDaysOfThisMonth.hasOwnProperty(oneDayOfThisMonth)) {
          activeDayLabel =
            <label
              key={`displayed-item-${ startCount }`}
              className='day-label-activity'
            >
              { startCount }
            </label>;

          dayLabelList.push(activeDayLabel);

        // disable day label
        } else {
          disableDayLabel =
            <label
              key={`displayed-item-${ startCount }`}
            >
              { startCount }
            </label>

          dayLabelList.push(disableDayLabel);

        }
      }
    }

    return dayLabelList;
  }

  generateQuotaList(year, month) {
    const randomNumber = Math.floor((Math.random() * 100) + 1);
    const maximumQuota = 20;
    const totalDays    = this.getDaysInMonth(year, month);
    const openDays     = this.getRandomNumber(10, totalDays);
    var quotaList      = {};
    var propertyName, timestampOfSpecifiedDay, quota;


    openDays.map(openDay => {
      timestampOfSpecifiedDay = Date.UTC(year, month, openDay);
      propertyName            = timestampOfSpecifiedDay;
      quota                   = this.getRandomNumber(1, maximumQuota)[0];

      quotaList[propertyName] = {
        quota: quota
      }
    });

    return quotaList;
  }

  getRandomNumber(quantity, maximumValue) {
    var randomNumber;
    var resultList = [];


    while(resultList.length !== quantity) {
      randomNumber = Math.ceil(Math.random() * maximumValue);

      // breaks one iteration, if the following condition occurs
      if(resultList.indexOf(randomNumber) !== -1) {
        continue;
      }

      resultList.push(randomNumber);
    }

    return resultList;
  }

  // for display
  getYear() {
    return this.currentDate.getFullYear();
  }

  // for display
  getMonth(dispalyStyle) {
    const defaultMappingList = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                               '10', '11', '12'];
    const enMappingList = ['january', 'february', 'march', 'april', 'may', 'june',
                           'july', 'august', 'september', 'october', 'november',
                           'december'];
    const zhMappingList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
                           '八月', '九月', '十月', '十一月', '十二月'];


    switch(dispalyStyle) {
      case 'en':
        return enMappingList[this.currentDate.getMonth()];

      case 'zh':
        return zhMappingList[this.currentDate.getMonth()];

      default:
        return defaultMappingList[this.currentDate.getMonth()];
    }
  }

  getDaysInMonth(year, month) {
    const nextMonth         = month + 1;
    const lastDayOfTheMonth = Date.UTC(year, nextMonth, 0);


    return new Date(lastDayOfTheMonth).getUTCDate();
  };

  getWeekdayByDate(year, month, day) {
    return new Date(Date.UTC(year, month, day)).getUTCDay();
  }

  lastMonthButtonHandler() {
    var month = this.currentDate.getUTCMonth();
    var year, needToBeModifiedState;


    this.currentDate.setUTCMonth(month - 1);

    year                  = this.currentDate.getUTCFullYear();
    month                 = this.currentDate.getUTCMonth();
    needToBeModifiedState = {selectedDay: undefined, openDaysOfThisMonth: this.generateQuotaList(year, month)};
    needToBeModifiedState = Object.assign({}, this.state, needToBeModifiedState);

    this.setState(needToBeModifiedState);
  }

  nextMonthButtonHandler() {
    var month = this.currentDate.getUTCMonth();
    var year, needToBeModifiedState;


    this.currentDate.setUTCMonth(month + 1);

    year                  = this.currentDate.getUTCFullYear();
    month                 = this.currentDate.getUTCMonth();
    needToBeModifiedState = {selectedDay: undefined, openDaysOfThisMonth: this.generateQuotaList(year, month)};
    needToBeModifiedState = Object.assign({}, this.state, needToBeModifiedState);

    this.setState(needToBeModifiedState);
  }

  selectDayLabelHandler(event) {
    const target      = event.target;
    const year        = this.currentDate.getUTCFullYear();
    const month       = this.currentDate.getUTCMonth();
    const selectedDay = Date.UTC(year, month, Number(target.innerHTML));
    var needToBeModifiedState;


    needToBeModifiedState = {selectedDay: selectedDay};
    needToBeModifiedState = Object.assign({}, this.state, needToBeModifiedState);

    if(target.className === 'day-label-activity') {
      this.setState(needToBeModifiedState);
    }
  }

  render() {
    const { selectedDay, openDaysOfThisMonth } = this.state;

    return (
      <div className='single-date-picker'>

        {/* Header */}
        <div className='single-date-picker-header'>

          {/* Last Month Button */}
          <a className='single-date-picker-header-button' onClick={ this.lastMonthButtonHandler }>
            <i className='fa fa-angle-left fa-fw' aria-hidden='true'></i>
          </a>

          {/* Title */}
          <h1>{`${ this.getYear() }年 ${ this.getMonth() }月`}</h1>

          {/* Next Month Button */}
          <a className='single-date-picker-header-button' onClick={ this.nextMonthButtonHandler }>
            <i className='fa fa-angle-right fa-fw' aria-hidden='true'></i>
          </a>
        </div>

        {/* Content */}
        <div className='single-date-picker-content'>

          {/* Week Label */}
          <div className='single-date-picker-week-label'>
            <label>日</label>
            <label>一</label>
            <label>二</label>
            <label>三</label>
            <label>四</label>
            <label>五</label>
            <label>六</label>
          </div>

          {/* Day Label */}
          <div className='single-date-picker-day-label' onClick={ this.selectDayLabelHandler }>
            { this.generateDayLabelList() }
          </div>

        </div>

        {/* Footer */}
        { selectedDay &&
          <div className='single-date-picker-footer'>
            {`還剩 ${ openDaysOfThisMonth[selectedDay].quota } 個名額`}
          </div>
        }

      </div>
    );
  }
}

export default SingleDatePicker;
