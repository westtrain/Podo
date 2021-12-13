import React, { useState } from "react";
import "../../style/App.scss";
import down_icon from "../../image/down_icon.png";
import up_icon from "../../image/up_icon.png";
import ReactDatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function FAQ(props) {
  const [height1, setHeight1] = useState(80);
  const [height2, setHeight2] = useState(80);
  const [height3, setHeight3] = useState(80);
  const [height4, setHeight4] = useState(80);
  const [changeImg1, setChangeImg1] = useState(false);
  const [changeImg2, setChangeImg2] = useState(false);
  const [changeImg3, setChangeImg3] = useState(false);
  const [changeImg4, setChangeImg4] = useState(false);

  const handleFAQ1 = () => {
    if (height1 === 80) {
      setHeight1(270);

      setChangeImg1(true);
    } else {
      setHeight1(80);

      setChangeImg1(false);
    }
  };
  const handleFAQ2 = () => {
    if (height2 === 80) {
      setHeight2(290);

      setChangeImg2(true);
    } else {
      setHeight2(80);

      setChangeImg2(false);
    }
  };
  const handleFAQ3 = () => {
    if (height3 === 80) {
      setHeight3(200);

      setChangeImg3(true);
    } else {
      setHeight3(80);

      setChangeImg3(false);
    }
  };
  const handleFAQ4 = () => {
    if (height4 === 80) {
      setHeight4(200);

      setChangeImg4(true);
    } else {
      setHeight4(80);

      setChangeImg4(false);
    }
  };

  return (
    <>
      <div className="faq">
        <div className="faqheader">자주 묻는 질문</div>
        <div className="faqmiddle">
          <div
            className="faqmquestion"
            onClick={handleFAQ1}
            style={{ height: height1 }}
          >
            <div className="faqmunit">
              <div className="faqmh">
                나의 구독 서비스를 공유하고 싶어요. (파티만들기)
              </div>
              {!changeImg1 ? (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleDown} size="2x" />
                </div>
              ) : (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleUp} size="2x" />
                </div>
              )}
              {/* <img src={down_icon} alt="down"></img> */}
            </div>

            <div className="faqexp">
              <div>
                Podo의 '파티 만들기' 메뉴를 통해 간편하게 파티를 만들고,
                파티원을 모집 할 수 있어요.
              </div>
              <div>
                파티를 만들려면 회원님 본인 명의의 구독 서비스 계정 정보를
                정확하게 입력해 주세요.
              </div>
              <div>
                공유할 구독 서비스 계정은 파티 생성 시 지정된 이용권이 결제 되어
                있어야 해요.
              </div>
              <div>
                SNS 아이디(네이버, 카카오, 구글, 페이스북 등)로 연결된 계정은
                타인과 공유해도 문제가 없는지 꼭 확인하고 공유해주세요.
              </div>
            </div>
          </div>
          <div
            className="faqmquestion"
            onClick={handleFAQ2}
            style={{ height: height2 }}
          >
            <div className="faqmunit">
              <div className="faqmh">
                다른 사람의 구독 서비스를 공유받고 싶어요. (파티찾기)
              </div>
              {!changeImg2 ? (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleDown} size="2x" />
                </div>
              ) : (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleUp} size="2x" />
                </div>
              )}
            </div>

            <div className="faqexp">
              <div>
                Podo의 '파티 찾기' 메뉴를 통해 원하는 구독 서비스의 파티를 찾아
                가입할 수 있어요.
              </div>
              <div>
                파티 가입이 완료 후, 파티 시작일이 되면 해당 파티의 파티 요금 및
                보증금 등이 결제됩니다.
              </div>
              <div>
                만약 가입한 파티의 구독 서비스 공유 형태가 파티장의 계정을
                공유하는 형태라면, 파티 시작일 이후부터 파티장의 '공유 로그인
                정보'를 조회할 수 있어요.
              </div>
              <div>
                만약 가입한 파티의 구독 서비스 공유 형태가 파티장으로부터 초대를
                받는 형태라면, 파티 시작일 이후부터 가입 시 회원님이 입력한
                계정으로 초대가 진행될 거에요.
              </div>
            </div>
          </div>
          <div
            className="faqmquestion"
            onClick={handleFAQ3}
            style={{ height: height3 }}
          >
            <div className="faqmunit">
              <div className="faqmh">'포도 머니'가 무엇언가요?</div>
              {!changeImg3 ? (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleDown} size="2x" />
                </div>
              ) : (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleUp} size="2x" />
                </div>
              )}
            </div>

            <div className="faqexp">
              <div>
                '포도 머니'는 링키드에서 현금처럼 사용 가능하고, 등록한 계좌로
                인출할 수 있는 재화입니다.
              </div>
              <div>
                '파티 요금','파티 해산 보상금', '파티 탈퇴 보상금' 등 적립되는
                모든 금액은 '링키드 머니'로 지급됩니다.
              </div>
            </div>
          </div>
          <div
            className="faqmquestion"
            onClick={handleFAQ4}
            style={{ height: height4 }}
          >
            <div className="faqmunit">
              <div className="faqmh">'포도 정산일'이 무엇인가요?</div>
              {!changeImg4 ? (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleDown} size="2x" />
                </div>
              ) : (
                <div className="faqmhicon">
                  <FontAwesomeIcon icon={faAngleUp} size="2x" />
                </div>
              )}
            </div>

            <div className="faqexp">
              <div>
                Podo에서 파티 요금의 적립과 결제가 이루어지는 기준 날짜를 '포도'
                정산일' 이라고 해요.
              </div>
              <div>
                파티장도, 파티원도 모두 매달 포도 정산일에 파티 요금을 정산해요.
              </div>
              <div>
                파티를 생성하거나, 가입한 경우에는 포도 정산일을 변경할 수
                없어요.
              </div>
            </div>
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
