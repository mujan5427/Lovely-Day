import React from 'react';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import Footer from './common/Footer';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, cancelButton } = this.props;

    return (
      <Wrapper>

        {/* Header */}
        <Header
          type='TYPE-3'
          title='申請預訂'
          closeButton={ cancelButton }
        />

        {/* Content */}
        <div className='dialog-content dialog-have-header-footer'>
          { children }
        </div>

        {/* Footer */}
        <Footer>
          <a className='button solid solid-theme-pink'>下一步</a>
        </Footer>
      </Wrapper>
    );
  }
}

export default Reservation;
