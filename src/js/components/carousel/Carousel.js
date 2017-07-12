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

    this.ID                  = new Date().getTime().toString(36);
    this.MOVE                = 2;
    this.END                 = 4;
    this.CAROUSEL_WIDTH      = 0;
    this.CAROUSEL_HALF_WIDTH = 0;
    this.CARD_TOTAL          = this.props.children.length - 2;
    this.USE_AUTOMATIC_LOOP  = this.props.useAutomaticLoop !== undefined ? this.props.useAutomaticLoop : false;
    this.INTERVAL            = 5000;


    /* * * * * * * * * * * * *
     *                       *
     *   Methods Bind Area   *
     *                       *
     * * * * * * * * * * * * */

    this.updateCarouselWidth = this.updateCarouselWidth.bind(this);
    this.btnPrev             = this.btnPrev.bind(this);
    this.btnNext             = this.btnNext.bind(this);
    this.animationEndHandler = this.animationEndHandler.bind(this);
    this.PanHandler          = this.PanHandler.bind(this);
    this.dataLoaded          = this.dataLoaded.bind(this);

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

  dataLoaded(event) {
    this.CAROUSEL_WIDTH      = document.getElementById(this.ID).getBoundingClientRect().width;
    this.CAROUSEL_HALF_WIDTH = this.CAROUSEL_WIDTH / 2;

    this.setState({
      index        : 1,
      coordinate   : (-this.CAROUSEL_WIDTH * this.state.index),
      useAnimation : this.state.useAnimation
    });
  }

  render() {
    const { useDashboard = true, placeHolderImagePath } = this.props;
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

          {/* Card Panel */}
          <section className='carousel-window-panel' id={ this.ID }>

            {/* Card Display Area */}
            <div style={ animationArguments }>
              { placeHolderImagePath &&
                <img
                  className='carousel-placeholder-image'
                  src={ placeHolderImagePath }
                  onLoad={ this.dataLoaded }
                />
              }

              { this.props.children }
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
