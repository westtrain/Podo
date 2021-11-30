import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";

function ConfirmPaymentModal(props) {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="modalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="cpmheader">
              <div>
                <div className="cpmhfirst">
                  <div className="cpmhff">지금 파티 가입하고</div>
                  <div className="cpmhfs">오늘부터</div>
                </div>
                <div className="cpmhsecond">
                  넷플릭스 프리미엄을 이용해 보세요.
                </div>
              </div>
            </div>
            <div className="cpmmf">
              <div className="cpmmff">이용 서비스</div>
              <div className="cpmmfs">넷플릭스 프리미엄</div>
            </div>
            <div className="cpmms">
              <div className="cpmmff">파티 기간</div>
              <div className="cpmmfs">오늘 ~ 2022.12.22</div>
            </div>
            <div className="cpmpay">파티 요금 정보</div>
            <div className="cpmpayf">
              <div className="cpmpayfh">
                <div className="cpmpayfhf">파티 요금 결제</div>
                <div className="cpmpayfhs">(월, VAT포함)</div>
              </div>
              <div className="cpmpayff">5,575원</div>
            </div>

            <button className="partysignbtn">
              <div className="partysignbtnw">파티 가입하기</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmPaymentModal;
