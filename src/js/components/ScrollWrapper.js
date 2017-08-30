import React from 'react';


class ScrollWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.scrollHandler = this.scrollHandler.bind(this);
  }

  scrollHandler(event) {
    const { callback }              = this.props;
    const target                    = event.target;
    const heightOfChildren          = target.scrollHeight;
    const heightOfCompnent          = target.getBoundingClientRect().height;
    const currentYScrollBarPosition = target.scrollTop + heightOfCompnent;
    const percentage                = Math.round(currentYScrollBarPosition / heightOfChildren * 1000) / 10;

    if(percentage === 100) {
      console.log('Welcome to my secret base 😎');
      callback();
    }

  }

  render() {
    const { children } = this.props;

    return (
      <div className='scroll-wrapper' onScroll={ this.scrollHandler }>
        { children }
      </div>
    );
  }
}

export default ScrollWrapper;
