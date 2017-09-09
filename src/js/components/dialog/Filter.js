import React from 'react';
import Wrapper from './common/Wrapper';
import Header from './common/Header';
import Footer from './common/Footer';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.dialogContentCSS = {
      'border-bottom': '1px solid',
      'border-top': '1px solid',
      'font-size': '1.1875em',
      height: 'calc(100% - 64px - 72px)'
    };

    this.dialogCheckboxCSS = {
      display: 'block',
      margin: '16px 0'
    };
  }

  render() {
    return (
      <Wrapper>

        {/* Header */}
        <Header type='TYPE-2' title='篩選條件' />

        {/* Content */}
        <div className='dialog-content' style={ this.dialogContentCSS }>

          {/* Dialog Section : Region */}
          <section>
            <div className='dialog-item-name'>地區</div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='region-1' type='checkbox' />
              <label htmlFor='region-1'>大台北</label>
            </div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='region-2' type='checkbox' />
              <label htmlFor='region-2'>桃竹苗</label>
            </div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='region-3' type='checkbox' />
              <label htmlFor='region-3'>宜蘭</label>
            </div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='region-4' type='checkbox' />
              <label htmlFor='region-4'>中彰投</label>
            </div>
          </section>

          {/* Dialog Section : Type */}
          <section>
            <div className='dialog-item-name'>類型</div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='type-1' type='checkbox' />
              <label htmlFor='type-1'>藝文手作</label>
            </div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='type-2' type='checkbox' />
              <label htmlFor='type-2'>玩樂廚房</label>
            </div>
            <div className='checkbox form-component-theme-gray' style={ this.dialogCheckboxCSS }>
              <input id='type-3' type='checkbox' />
              <label htmlFor='type-3'>愛上戶外</label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </Wrapper>
    );
  }
}

export default Filter;
