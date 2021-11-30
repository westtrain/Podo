import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import PodoMoney from "../../image/PodoMoney.svg";

function WithdrawModal(props) {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="withdrawalmodalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="wdmheader">인출하기</div>
            <div className="podomoney">Podo 머니 잔액</div>
            <div className="wdmmf">
              <div className="wdmmff">
                <img src={PodoMoney} alt="podomoney"></img>
              </div>
              <div className="wdmmfs">현재 잔액 9,000원</div>
            </div>
            <div className="withdrawalaccount">인출 계좌</div>
            <div className="wdmms">
              <div className="wdmmff">+ 계좌 등록하기</div>
              <div className="wdmmfs">본인 명의의 계좌만 등록할 수 있어요.</div>
            </div>
            <div className="withdrawalguide">인출 신청 안내</div>
            <div className="wdmpay">
              <div className="wdmpayw">
                - 인출 시 등록하신 계좌로 바로 입금됩니다.
              </div>
              <div className="wdmpayw">
                - 본인 명의의 계좌가 아닌 경우 인출이 제한됩니다.
              </div>
            </div>

            <div className="clearbtnwrap">
              <button className="clearbtn">
                <div className="clearbtnw">완료</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithdrawModal;
