/*
 * Instructions :
 *
 * You can set height of carousel by height of `children` of <Carousel> component.
 *
 * Make `children` have hyperlink by using <Link> component of React-Router or just use <a> tag.
 */


import React from 'react';
var Hammer = require('react-hammerjs');

class Carousel extends React.Component {
  constructor (props) {
    super(props);


    /* * * * * * * * * * * * *
     *                       *
     *     Constant Area     *
     *                       *
     * * * * * * * * * * * * */

    this.ID                     = new Date().getTime().toString(36);
    this.MOVE                   = 2;
    this.END                    = 4;
    this.CAROUSEL_WIDTH         = 0;
    this.CAROUSEL_HALF_WIDTH    = 0;
    this.CAROUDEL_WIDTH_CHECKED = false;
    this.MOUSE_DOWN_COORDINATE  = 0;
    this.MOUSE_UP_COORDINATE    = 0;
    this.CARD_TOTAL             = this.props.children.length;
    this.USE_AUTOMATIC_LOOP     = this.props.useAutomaticLoop !== undefined ? this.props.useAutomaticLoop : false;
    this.INTERVAL               = 5000;


    /* * * * * * * * * * * * *
     *                       *
     *   Methods Bind Area   *
     *                       *
     * * * * * * * * * * * * */

    this.updateCarouselWidth             = this.updateCarouselWidth.bind(this);
    this.btnPrev                         = this.btnPrev.bind(this);
    this.btnNext                         = this.btnNext.bind(this);
    this.animationEndHandler             = this.animationEndHandler.bind(this);
    this.PanHandler                      = this.PanHandler.bind(this);
    this.contentDataLoaded               = this.contentDataLoaded.bind(this);
    this.preventDefaultBehavior          = this.preventDefaultBehavior.bind(this);
    this.preventUnexpectedEventTriggered = this.preventUnexpectedEventTriggered.bind(this);
    this.recordMouseDownCoordinate       = this.recordMouseDownCoordinate.bind(this);
    this.recordMouseUpCoordinate         = this.recordMouseUpCoordinate.bind(this);
    this.generateHyperlinkPath           = this.generateHyperlinkPath.bind(this);

    window.addEventListener('resize', this.updateCarouselWidth);


    /* * * * * * * * * * * * *
     *                       *
     *    Component State    *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      index        : 1,
      coordinate   : 0,
      useAnimation : true
    };
  }


  /* * * * * * * * * * * * *
   *                       *
   *  Component Lifecycle  *
   *                       *
   * * * * * * * * * * * * */

  componentDidMount() {
    if (this.USE_AUTOMATIC_LOOP) {
      this.startCarouselTimer();
    }
  }

  componentWillUnmount() {
    if (this.USE_AUTOMATIC_LOOP) {
      this.stopCarouselTimer();
    }

    window.removeEventListener('resize', this.updateCarouselWidth);
  }


  /* * * * * * * * * * * * *
   *                       *
   *        Methods        *
   *                       *
   * * * * * * * * * * * * */

  startCarouselTimer() {
    this.carouselTimer = setInterval(this.btnNext, this.INTERVAL);
  }

  stopCarouselTimer() {
    clearInterval(this.carouselTimer);
    this.carouselTimer = 0;
  }

  restartCarouselTimer(callback) {
    if (this.carouselTimer === 0 && this.USE_AUTOMATIC_LOOP === true) {
      callback();
      this.startCarouselTimer();

    } else {
      callback();

    }
  }

  updateCarouselWidth() {
    this.CAROUSEL_WIDTH      = document.getElementById(this.ID).getBoundingClientRect().width;
    this.CAROUSEL_HALF_WIDTH = this.CAROUSEL_WIDTH / 2;

    this.setState({
      index        : this.state.index,
      coordinate   : (-this.CAROUSEL_WIDTH * this.state.index),
      useAnimation : this.state.useAnimation
    });
  }

  // When card is in boundary then rollback to the right coordinate.
  rollbackCard() {
    if (this.state.index === (this.CARD_TOTAL + 1)) {
      this.setState({
        index        : 1,
        coordinate   : -this.CAROUSEL_WIDTH * 1,
        useAnimation : false
      });

    } else if (this.state.index === 0) {
      this.setState({
        index        : this.CARD_TOTAL,
        coordinate   : -this.CAROUSEL_WIDTH * this.CARD_TOTAL,
        useAnimation : false
      });

    }
  }

  animationEndHandler() {
    this.rollbackCard();
  }

  calculateIndexPickerList() {
    var start = 1;
    var end   = this.CARD_TOTAL;
    var indexPickerList  = [];

    if (end !== 0) {
      for (start; start <= end; start++) {

        indexPickerList[start - 1] =
        <span
          className={ this.state.index === start ? 'carousel-index-picker-active' : null }
          key={ start }
          onClick={ this.moveToSpecifiedIndex.bind(this, start) }
        ></span>;
      }

    } else {
      indexPickerList = false;

    }

    return indexPickerList;
  }

  moveToSpecifiedIndex(specifiedIndex) {
    if (this.carouselTimer !== 0 && this.USE_AUTOMATIC_LOOP === true) {
      this.stopCarouselTimer();
    }

    this.setState({
      index        : specifiedIndex,
      coordinate   : (-this.CAROUSEL_WIDTH * specifiedIndex),
      useAnimation : true
    });
  }

  btnPrev() {
    if (this.state.index !== 0) {
      this.setState({
        index        : this.state.index - 1,
        coordinate   : (-this.CAROUSEL_WIDTH * (this.state.index - 1)),
        useAnimation : true
      });
    }
  }

  btnNext() {
    if (this.state.index !== (this.CARD_TOTAL + 1)) {
      this.setState({
        index        : this.state.index + 1,
        coordinate   : (-this.CAROUSEL_WIDTH * (this.state.index + 1)),
        useAnimation : true
      });
    }
  }

  PanHandler (event) {
    switch (event.eventType) {
      case this.END:
        if (event.velocityX <= -0.5) {
          this.btnNext();

        } else if (event.velocityX >= 0.5) {
          this.btnPrev();

        } else if (event.deltaX <= -this.CAROUSEL_HALF_WIDTH) {
          this.btnNext();

        } else if (event.deltaX >= this.CAROUSEL_HALF_WIDTH) {
          this.btnPrev();

        } else {
          this.setState({
            index        : this.state.index,
            coordinate   : (-this.CAROUSEL_WIDTH * this.state.index),
            useAnimation : true
          });
        }
        break;

      case this.MOVE:
        if (this.state.index === (this.CARD_TOTAL + 1) || this.state.index === 0) {
          this.rollbackCard();

        } else {
          this.setState({
            index        : this.state.index,
            coordinate   : (-this.CAROUSEL_WIDTH * this.state.index) + event.deltaX,
            useAnimation : false
          });
        }
        break;

      default:
        break;
    }
  }

  contentDataLoaded(event) {
    if (!this.CAROUDEL_WIDTH_CHECKED) {
      this.CAROUSEL_WIDTH         = document.getElementById(this.ID).getBoundingClientRect().width;
      this.CAROUSEL_HALF_WIDTH    = this.CAROUSEL_WIDTH / 2;
      this.CAROUDEL_WIDTH_CHECKED = true;

      this.setState({
        index        : 1,
        coordinate   : (-this.CAROUSEL_WIDTH * this.state.index),
        useAnimation : this.state.useAnimation
      });
    }
  }

  preventUnexpectedEventTriggered(event) {
    if (this.MOUSE_DOWN_COORDINATE !== this.MOUSE_UP_COORDINATE && window.browserInfo.name === 'firefox') {
      event.preventDefault();
    }
  }

  preventDefaultBehavior(event) {
    event.preventDefault();
  }

  recordMouseDownCoordinate(event) {
    this.MOUSE_DOWN_COORDINATE = event.clientX;
  }

  recordMouseUpCoordinate(event) {
    this.MOUSE_UP_COORDINATE = event.clientX;
  }

  generateHyperlinkPath(carouselItemIndex) {
    const { content } = this.props;

    if(!isEmpty(content) && content[carouselItemIndex].hasOwnProperty('href')) {
      return content[carouselItemIndex].href;

    } else {
      return undefined;

    }
  }

  render() {
    const { useDashboard = true, children, content } = this.props;
    const childrenCount  = children.length;
    var animationArguments;

    if (this.state.useAnimation !== true) {
      animationArguments = {
        transform: `translate3d(${ this.state.coordinate.toString() }px, 0, 0)`,
        transition: 'none'
      };
    } else {

      animationArguments = {
        transform: `translate3d(${ this.state.coordinate.toString() }px, 0, 0)`
      };
    }

    return (
      <div>
        <Hammer onPan={ this.PanHandler } onTransitionEnd={ this.animationEndHandler }>

          {/* Content Panel */}
          <section className='carousel-window-panel' id={ this.ID }>

            {/* Content Display Area */}
            <div style={ animationArguments }>

              {/* Content Placeholder Start */}
              { children &&
                <a
                  onDragStart={ this.preventDefaultBehavior }
                  onClick={ this.preventUnexpectedEventTriggered }
                  onMouseDown={ this.recordMouseDownCoordinate }
                  onMouseUp={ this.recordMouseUpCoordinate }
                  onLoad={ this.contentDataLoaded }
                >
                  { children[childrenCount - 1] }
                </a>
              }

              {/* Content Data */}
              { children &&
                children.map((item, index) => {
                  return (<a
                    key={ index }
                    href={ this.generateHyperlinkPath(index) }
                    onDragStart={ this.preventDefaultBehavior }
                    onClick={ this.preventUnexpectedEventTriggered }
                    onMouseDown={ this.recordMouseDownCoordinate }
                    onMouseUp={ this.recordMouseUpCoordinate }
                  >
                    { children[index] }
                  </a>)
                })
              }

              {/* Content Placeholder End */}
              { children &&
                <a
                  onDragStart={ this.preventDefaultBehavior }
                  onClick={ this.preventUnexpectedEventTriggered }
                  onMouseDown={ this.recordMouseDownCoordinate }
                  onMouseUp={ this.recordMouseUpCoordinate }
                >
                  { children[0] }
                </a>
              }
            </div>

            {/* DashBoard */}
            { useDashboard &&
              <div
                className='carousel-dashboard carousel-button-prev'
                onClick={ this.restartCarouselTimer.bind(this, this.btnPrev) }
              >
                <i className='fa fa-angle-left' aria-hidden='true'></i>
              </div>
            }

            { useDashboard &&
              <div
                className='carousel-dashboard carousel-button-next'
                onClick={ this.restartCarouselTimer.bind(this, this.btnNext) }
              >
                <i className='fa fa-angle-right' aria-hidden='true'></i>
              </div>
            }

            {/* Index Picker List */}
            <div>
              { this.calculateIndexPickerList() }
            </div>
          </section>
        </Hammer>
      </div>
    );
  }
}

export default Carousel;
