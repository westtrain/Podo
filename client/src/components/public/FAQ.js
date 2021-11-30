import React from "react";
import "../../style/App.scss";
import down_icon from "../../image/down_icon.png";

function FAQ(props) {
  return (
    <>
      <div className="faq">
        <div className="faqheader">자주 묻는 질문</div>
        <div className="faqmiddle">
          <div className="faqmunit">
            <div>나의 구독 서비스를 공유하고 싶어요. (파티만들기)</div>
            <img src={down_icon} alt="down"></img>
          </div>
          <div className="faqmunit">
            <div>다른 사람의 구독 서비스를 공유받고 싶어요. (파티찾기)</div>
            <img src={down_icon} alt="down"></img>
          </div>
          <div className="faqmunit">
            <div>'포도 머니'가 무엇언가요?</div>
            <img src={down_icon} alt="down"></img>
          </div>
          <div className="faqmunit">
            <div>'포도 정산일'이 무엇인가요?</div>
            <img src={down_icon} alt="down"></img>
          </div>
        </div>
        <div className="faqfooter">
          <div>더 궁금한 내용이 있으신가요?</div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
