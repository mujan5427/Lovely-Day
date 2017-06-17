import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content'>
        <section className='profile-section'>
          <h1>個人資料</h1>

          <div>
            <label>名字</label>
            <div className='input-box form-component-theme-gray'>
              <input type='text' />
            </div>
          </div>

          <div>
            <label>姓氏</label>
            <div className='input-box form-component-theme-gray'>
              <input type='text' />
            </div>
            <div className='profile-form-component-description'>您的公開個人資料僅會顯示您的名字。</div>
          </div>

          <div>
            <label>性別</label>
            <div className='selectbox'>
              <select className='form-component-theme-gray'>
                <option value=''>男性</option>
                <option value=''>女性</option>
              </select>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>出生日期</label>
            <div className='space-between'>
              <div className='selectbox'>
                <select className='form-component-theme-gray' value='feb'>
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
                <select className='form-component-theme-gray' value='2'>
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
                <select className='form-component-theme-gray' value='1989'>
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
            <div className='profile-form-component-description'>您來到這個世界的神奇日子。此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>電子郵件</label>
            <div className='input-box form-component-theme-gray'>
              <input type='email' />
            </div>
            <div className='profile-form-component-description'>我們不會向其他Levely Day用戶透露您的個人電子郵件地址。</div>
          </div>

          <div>
            <label>語言</label>
            <div className='selectbox'>
              <select className='form-component-theme-gray' value='zh-TW'>
                <option value='id'>Bahasa Indonesia</option>
                <option value='ms'>Bahasa Melayu</option>
                <option value='ca'>Català</option>
                <option value='da'>Dansk</option>
                <option value='de'>Deutsch</option>
                <option value='en'>English</option>
                <option value='es'>Español</option>
                <option value='el'>Eλληνικά</option>
                <option value='fr'>Français</option>
                <option value='it'>Italiano</option>
                <option value='hu'>Magyar</option>
                <option value='nl'>Nederlands</option>
                <option value='no'>Norsk</option>
                <option value='pl'>Polski</option>
                <option value='pt'>Português</option>
                <option value='fi'>Suomi</option>
                <option value='sv'>Svenska</option>
                <option value='tr'>Türkçe</option>
                <option value='is'>Íslenska</option>
                <option value='cs'>Čeština</option>
                <option value='ru'>Русский</option>
                <option value='th'>ภาษาไทย</option>
                <option value='zh'>中文 (简体)</option>
                <option value='zh-TW'>中文 (繁體)</option>
                <option value='ja'>日本語</option>
                <option value='ko'>한국어</option>
              </select>
            </div>
            <div className='profile-form-component-description'>我們會使用此語言向您發送訊息。</div>
          </div>

          <div>
            <label>教育程度</label>
            <div className='profile-form-component-group'>
              <div className='radiobox form-component-theme-gray'>
                <input id='junior-high-school' type='radio' name='education-level' />
                <label htmlFor='junior-high-school'>國中</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='high-school' type='radio' name='education-level' />
                <label htmlFor='high-school'>高中</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='university' type='radio' name='education-level' />
                <label htmlFor='university'>大學</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='master-degree' type='radio' name='education-level' />
                <label htmlFor='master-degree'>碩士</label>
              </div>
              <div className='radiobox form-component-theme-gray'>
                <input id='doctorate-degree' type='radio' name='education-level' />
                <label htmlFor='doctorate-degree'>博士</label>
              </div>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <label>興趣類型</label>
            <div className='profile-form-component-group'>
              <div className='checkbox form-component-theme-gray'>
                <input id='sport' type='checkbox' />
                <label htmlFor='sport'>運動</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='handmade' type='checkbox' />
                <label htmlFor='handmade'>手作</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='baking' type='checkbox' />
                <label htmlFor='baking'>烘焙</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='camping' type='checkbox' />
                <label htmlFor='camping'>露營</label>
              </div>
              <div className='checkbox form-component-theme-gray'>
                <input id='history' type='checkbox' />
                <label htmlFor='history'>歷史</label>
              </div>
            </div>
            <div className='profile-form-component-description'>此數據僅作分析用途，不會透露給其他用戶。</div>
          </div>

          <div>
            <a className='button solid solid-theme-pink' href>儲存</a>
          </div>

        </section>
      </div>
    );
  }
}

export default Profile;
