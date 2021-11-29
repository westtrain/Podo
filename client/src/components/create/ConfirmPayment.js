import React from "react";
import { Link } from "react-router-dom";

function ConfirmPayment(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step6"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            마지막 단계예요.
            <br />
            결제/정산 정보를 확인하세요.
          </div>
        </div>
        <div className="guidemiddle">
          <div className="paymentbox">
            국민KB카드 ****8888
            <div className="paymentright">
              변경하기
              <div className="arrow"> &#62;</div>
            </div>
          </div>
          <div className="paymentbox">
            신난보라돌이님의 정산일 : 매달 3일
            <div className="paymentright">
              변경하기
              <div className="arrow"> &#62;</div>
            </div>
          </div>
          <div className="infoperiod">
            - 결제 카드는 파티장의 귀책 사유 발생 시 위약금을 부과하기 위해
            필요해요. 파티가 잘 진행된다면 위약금이 발생할 일은 절대 없으니
            안심하세요.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/cerate/6"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ConfirmPayment;
