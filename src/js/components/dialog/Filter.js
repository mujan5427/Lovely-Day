import React from 'react';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import Footer from './common/Footer';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <Wrapper>

        {/* Header */}
        <Header type='TYPE-2' title='篩選條件' />

        {/* Content */}
        <div className='dialog-content dialog-have-header-footer'>
          { children }
        </div>

        {/* Footer */}
        <Footer>
          <a className='button solid solid-theme-pink'>查看體驗</a>
        </Footer>
      </Wrapper>
    );
  }
}

export default Filter;
