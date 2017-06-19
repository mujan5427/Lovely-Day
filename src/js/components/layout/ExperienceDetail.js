import React from 'react';

class ExperienceDetail extends React.Component {
  constructor(props) {
    super(props);

    this.recommendationPanel = {
      'text-align': 'center'
    };
  }

  render() {
    return (
      <div className='content'>

        {/* Carousel */}
        <div className='experience-detail-carousel'>
          <img src='/assets/product7.jpg' />
          <div className='carousel-picker'>
            <img src='/assets/product7.jpg' />
            <img src='/assets/product8.jpg' />
            <img src='/assets/product9.jpg' />
            <img src='/assets/product10.jpg' />
          </div>
        </div>

        {/* Title */}
        <section className='experience-detail-section'>
          <h1>
            隱藏在象鼻岩的秘境，划獨木舟探險去吧！
          </h1>
        </section>

        {/* Host Information Panel */}
        <section className='experience-detail-section'>
          <div className='experience-detail-host-information-panel'>
            <div className='host-name'>
              <div>Hosted by </div>
              <div>Garrett</div>
            </div>
            <div className='portrait-circle'>
              <img src='/assets/person1.jpg' />
            </div>
          </div>
        </section>

        {/* Experience Information Panel */}
        <section className='experience-detail-section article'>
          <h2>
            體驗內容
          </h2>
          <ul>
            <li>專業又熱情的教練隨侍在側，初次划獨木舟也玩得超安心</li>
            <li>探訪超隱密的海岸景點，壯闊大海與無限美景</li>
            <li>乾淨舒適工作室休息，舒服沐浴換衣</li>
            <li>工作室至划舟點來回接送</li>
          </ul>

          <div className='article-show-more'>
            <a href>看更多+</a>
          </div>
        </section>

        <section className='experience-detail-section article'>
          <h2>
            簡介
          </h2>
          <p><strong>你有看過在大海中的大象嗎？你知道在基隆也有雙足難以到達的無人沙灘嗎？</strong></p>
          <p>東北角海岸線風景優美、奇岩怪石多，但有個私密景點你可知道嗎？這次安心立工作室要帶著各位玩咖們，一起用獨木舟划向大海上，探訪北海岸最隱密的私房景點 - 象鼻岩！大自然經年累積所創作的岩洞，有一種神鬼奇航般的壯闊感，進入洞穴裡，感覺特別清涼與神秘！來到這，你也一定會對象鼻岩的鬼斧神工充滿了讚嘆！之後繼續造訪無人沙灘，在沙灘休息片刻，彷彿是在國外的錯覺享受。在海上划行獨木舟不會造成太多的噪音，偶爾還會看到有海龜游上來海面呼吸休息呢</p>
          <p><strong>豐富的海蝕地形，加上美麗的海岸風景，原來北台灣划獨木舟還可以這樣玩！這個夏天，就出發去被列為台灣 36 秘境之一的象鼻岩探險去！</strong></p>
          <p><span>獨木舟Ｘ象鼻岩無人沙灘新玩法</span></p>
          <p>瑞芳濱海深澳海岬擁有許多奇岩怪石，其中這次要帶你去的主角就是石頭形狀貌似象鼻的「象鼻岩」，全程由專業的教練帶領，坐上獨木舟緩緩地在湛藍海上划行，帶你探訪深奧天然石洞。抵達目地的象鼻岩後，穿梭進入大象鼻子間的岩洞，有一種神鬼奇航般壯闊感，感覺特別清涼與神秘！獨木舟在海上不會造成太多的噪音，仔細觀察水面，偶爾還會看到有海龜游上來海面呼吸休息呢！探訪完象鼻岩後，繼續前往無人沙灘，無人沙灘是一個平常用步行無法抵達位山崖下的海灘，正因難以抵達，所以特別安靜舒服，躺在沙灘休息片刻，吃吃點心，還能下海玩水消暑，這不就是度假生活了嗎！最後回到出發地安欣立工作室盥洗休息。</p>
          <p><span>*早晨場次（05:30集合）基本上會進無人沙灘，但須視現場情況決定，報名前請詳知</span></p>
          <p></p>
          <p>玩不夠嗎?更多海科館探索X水上活動體驗行程等著你！</p>

          <div className='article-show-more'>
            <a href>看更多+</a>
          </div>
        </section>

        <section className='experience-detail-section article'>
          <h2>
            取消辦法
          </h2>
          <ol>
            <li>出發日前 7 日前 (不含出發日) 通知取消，全額退回款項。</li>
            <li>出發日前 6 日至前 4 日內 (不含出發日) 通知取消，將退回已付金額的 50%。</li>
            <li>出發日前 3 日至當日內不接受取消，並不予退回款項。</li>
            <li>於活動中如因非可究責主辦單位之因素中止參與活動，將不予退回款項。</li>
            <li>建議您出發日前 6 日內如須取消，可將名額轉讓。但請務必告知 Lovely Day，代理參與者的姓名及聯絡資訊。</li>
            <li>如因天災等不可抗力因素，Lovely Day 將主動聯繫延期或退款。</li>
          </ol>

          <div className='article-show-more'>
            <a href>看更多+</a>
          </div>
        </section>

        <section className='experience-detail-section'>
          <h1 style={ this.recommendationPanel }>
            You May Also Like
          </h1>
        </section>

        {/* Recommendation Panel */}
        <ul className='channel-list'>
          <li className='channel-item'>
            <div className='channel-photo'>
              <img src='/assets/product5.jpg' />
            </div>
            <div className='channel-description'>
              <h1>墾丁國家公園，帆船之旅，日初東方至晚霞染起</h1>
              <div>
                <span>TWD 1,599</span>
              </div>
            </div>
          </li>
        </ul>

      </div>
    );
  }
}

export default ExperienceDetail;
