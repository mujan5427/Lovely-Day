import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className='footer-section-main'>
          <div>
            <h1>Lovely Day</h1>
            <ul>
              <li><a>關於我們</a></li>
              <li><a>媒體</a></li>
              <li><a>聯絡客服</a></li>
              <li><a>工作機會</a></li>
              <li><a>政策</a></li>
              <li><a>協助</a></li>
            </ul>
          </div>
          <div>
            <h1>探索</h1>
            <ul>
              <li><a>信任與安全</a></li>
              <li><a>旅遊基金</a></li>
              <li><a>商務差旅</a></li>
              <li><a>旅遊指南</a></li>
            </ul>
          </div>
          <div>
            <h1>體驗</h1>
            <ul>
              <li><a>何謂體驗?</a></li>
              <li><a>待客服務</a></li>
              <li><a>達人義務</a></li>
            </ul>
          </div>
          <div>
            <h1>社群媒體</h1>
            <a>
              <div className='image-badge'>
                <i className='fa fa-facebook' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-youtube' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-twitter' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-instagram' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-weibo' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-qq' aria-hidden='true'></i>
              </div>
            </a>
            <a>
              <div className='image-badge'>
                <i className='fa fa-wechat' aria-hidden='true'></i>
              </div>
            </a>
          </div>
        </div>
        <div className='footer-section-legal-declaration'>
          <div>COPYRIGHT © 2017 Lovely Day</div>
          <div>&nbsp;All rights reserved.</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
