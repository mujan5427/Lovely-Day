import React from 'react';
import Wrapper from './common/Wrapper';
import Header from './common/Header';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.dialogContentCSS = {
      height: 'calc(100% - 64px)'
    };

    this.hrCSS = {
      margin: '30px 0'
    };
  }

  render() {
    return (
      <Wrapper>

        {/* Header */}
        <Header type='TYPE-1' />

        {/* Content */}
        <div className='dialog-content' style={ this.dialogContentCSS }>
          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-envelope-o fa-fw' aria-hidden='true'></i>
            <input type='email' placeholder='電子郵件' />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
            <input type='text' placeholder='名字' />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-user-o fa-fw' aria-hidden='true'></i>
            <input type='text' placeholder='姓氏' />
          </div>

          <div className='input-box icon-right form-component-theme-gray'>
            <i className='fa fa-key fa-fw' aria-hidden='true'></i>
            <input type='password' placeholder='密碼' />
          </div>

          {/* Select Box */}

          <section>
            <span>生日</span>

            <div className='space-between'>
              <div className='selectbox'>
                <select className='input select' value='feb'>
                  <option value=''>一月</option>
                  <option value='feb'>二月</option>
                  <option value=''>三月</option>
                  <option value=''>四月</option>
                  <option value=''>五月</option>
                  <option value=''>六月</option>
                  <option value=''>七月</option>
                  <option value=''>八月</option>
                  <option value=''>九月</option>
                  <option value=''>十月</option>
                  <option value=''>十一月</option>
                  <option value=''>十二月</option>
                </select>
              </div>
              <div className='selectbox'>
                <select className='input select' value='2'>
                  <option value=''>1</option>
                  <option value='2'>2</option>
                  <option value=''>3</option>
                  <option value=''>4</option>
                  <option value=''>5</option>
                  <option value=''>6</option>
                  <option value=''>7</option>
                  <option value=''>8</option>
                  <option value=''>9</option>
                  <option value=''>10</option>
                  <option value=''>11</option>
                  <option value=''>12</option>
                  <option value=''>13</option>
                  <option value=''>14</option>
                  <option value=''>15</option>
                  <option value=''>16</option>
                  <option value=''>17</option>
                  <option value=''>18</option>
                  <option value=''>19</option>
                  <option value=''>20</option>
                  <option value=''>21</option>
                  <option value=''>22</option>
                  <option value=''>23</option>
                  <option value=''>24</option>
                  <option value=''>25</option>
                  <option value=''>26</option>
                  <option value=''>27</option>
                  <option value=''>28</option>
                  <option value=''>29</option>
                  <option value=''>30</option>
                  <option value=''>31</option>
                </select>
              </div>
              <div className='selectbox'>
                <select className='input select' value='1989'>
                  <option value='1999'>1999</option>
                  <option value='1998'>1998</option>
                  <option value='1997'>1997</option>
                  <option value='1996'>1996</option>
                  <option value='1995'>1995</option>
                  <option value='1994'>1994</option>
                  <option value='1993'>1993</option>
                  <option value='1992'>1992</option>
                  <option value='1991'>1991</option>
                  <option value='1990'>1990</option>
                  <option value='1989'>1989</option>
                  <option value='1988'>1988</option>
                  <option value='1987'>1987</option>
                  <option value='1986'>1986</option>
                  <option value='1985'>1985</option>
                  <option value='1984'>1984</option>
                  <option value='1983'>1983</option>
                  <option value='1982'>1982</option>
                  <option value='1981'>1981</option>
                  <option value='1980'>1980</option>
                  <option value='1979'>1979</option>
                  <option value='1978'>1978</option>
                  <option value='1977'>1977</option>
                  <option value='1976'>1976</option>
                  <option value='1975'>1975</option>
                  <option value='1974'>1974</option>
                  <option value='1973'>1973</option>
                  <option value='1972'>1972</option>
                  <option value='1971'>1971</option>
                  <option value='1970'>1970</option>
                  <option value='1969'>1969</option>
                  <option value='1968'>1968</option>
                  <option value='1967'>1967</option>
                  <option value='1966'>1966</option>
                  <option value='1965'>1965</option>
                  <option value='1964'>1964</option>
                  <option value='1963'>1963</option>
                  <option value='1962'>1962</option>
                  <option value='1961'>1961</option>
                  <option value='1960'>1960</option>
                  <option value='1959'>1959</option>
                  <option value='1958'>1958</option>
                  <option value='1957'>1957</option>
                  <option value='1956'>1956</option>
                  <option value='1955'>1955</option>
                  <option value='1954'>1954</option>
                  <option value='1953'>1953</option>
                  <option value='1952'>1952</option>
                  <option value='1951'>1951</option>
                  <option value='1950'>1950</option>
                  <option value='1949'>1949</option>
                  <option value='1948'>1948</option>
                  <option value='1947'>1947</option>
                  <option value='1946'>1946</option>
                  <option value='1945'>1945</option>
                  <option value='1944'>1944</option>
                  <option value='1943'>1943</option>
                  <option value='1942'>1942</option>
                  <option value='1941'>1941</option>
                  <option value='1940'>1940</option>
                  <option value='1939'>1939</option>
                  <option value='1938'>1938</option>
                  <option value='1937'>1937</option>
                  <option value='1936'>1936</option>
                  <option value='1935'>1935</option>
                  <option value='1934'>1934</option>
                  <option value='1933'>1933</option>
                  <option value='1932'>1932</option>
                  <option value='1931'>1931</option>
                  <option value='1930'>1930</option>
                  <option value='1929'>1929</option>
                  <option value='1928'>1928</option>
                  <option value='1927'>1927</option>
                  <option value='1926'>1926</option>
                  <option value='1925'>1925</option>
                  <option value='1924'>1924</option>
                  <option value='1923'>1923</option>
                  <option value='1922'>1922</option>
                  <option value='1921'>1921</option>
                  <option value='1920'>1920</option>
                  <option value='1919'>1919</option>
                  <option value='1918'>1918</option>
                  <option value='1917'>1917</option>
                </select>
              </div>
            </div>
          </section>

          {/* Check Box */}

          <div className='space-between'>
            <div className='checkbox'>
              <input id='i-agree' type='checkbox' />
              <label htmlFor='i-agree'>
                我同意 Lovely Day 的
                <a className='href-highlight' href>服務條款</a>
                、
                <a className='href-highlight' href>隱私政策</a>
              </label>
            </div>
          </div>

          <a className='button-solid'>註冊</a>

          <hr className='hr' style={ this.hrCSS } />

          <div className='space-between'>
            <span>已經有 Lovely Day 帳號?</span>
            <a className='button-hollow'>登入</a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Signup;
