import React from "react";

function MyStateMent(props) {
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제/적립/인출 관리</div>
            <div className="statementbox">
              <div className="statement">
                2021-11-25
                <div className="bottombox">
                  <div className="paymenttype">왓챠 파티 카드 결제</div>
                  <div className="amount">4,450원</div>
                </div>
              </div>
              <div className="statement">
                2021-11-25
                <div className="bottombox">
                  <div className="paymenttype">넷플릭스 파티 적립</div>
                  <div className="amount">13,500원</div>
                </div>
              </div>
              <div className="statement">
                2021-11-29
                <div className="bottombox">
                  <div className="paymenttype">Podo머니 인출</div>
                  <div className="amount">13,500원</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyStateMent;
