import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.dialogContentCSS = {
      'border-bottom': '1px solid',
      'border-top': '1px solid',
      bottom: '72px',
      'font-size': '1.1875em',
      top: '64px'
    };
  }

  render() {
    return (
      <div className='dialog-box-background'>
        <div className='dialog-box'>

          {/* Header */}
          <div className='dialog-header'>
            <a href className='custom-close-dialog-button'>
              <i className='fa fa-times fa-2x' aria-hidden='true'></i>
            </a>
            <span>篩選條件</span>
            <a href className='href-highlight'>重設</a>
          </div>

          {/* Content */}
          <div className='dialog-content' style={ this.dialogContentCSS }>

            {/* Dialog Item : Region */}
            <section>
              <div className='dialog-item-name'>地區</div>
              <div className='checkbox'>
                <input id='region-1' type='checkbox' />
                <label htmlFor='region-1'>大台北</label>
              </div>
              <div className='checkbox'>
                <input id='region-2' type='checkbox' />
                <label htmlFor='region-2'>桃竹苗</label>
              </div>
              <div className='checkbox'>
                <input id='region-3' type='checkbox' />
                <label htmlFor='region-3'>宜蘭</label>
              </div>
              <div className='checkbox'>
                <input id='region-4' type='checkbox' />
                <label htmlFor='region-4'>中彰投</label>
              </div>
            </section>

            {/* Dialog Item : Type */}
            <section>
              <div className='dialog-item-name'>類型</div>
              <div className='checkbox'>
                <input id='type-1' type='checkbox' />
                <label htmlFor='type-1'>藝文手作</label>
              </div>
              <div className='checkbox'>
                <input id='type-2' type='checkbox' />
                <label htmlFor='type-2'>玩樂廚房</label>
              </div>
              <div className='checkbox'>
                <input id='type-3' type='checkbox' />
                <label htmlFor='type-3'>愛上戶外</label>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className='dialog-footer'>
            <a>查看體驗</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
