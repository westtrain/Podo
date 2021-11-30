import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";

function SetSettlementModal(props) {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="setcardmodalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="scmheader">포도머니 정산일을 설정해 주세요.</div>

            <div className="scmhf">
              내가 원하는 날에 모든 파티 요금을
              <br></br>
              한번에 정산할 수 있어요.
            </div>

            <div className="ssmmf">
              <div>매월</div>
              <input placeholder="1 ~ 28일 중 입력하세요"></input>
              <div>일</div>
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

export default SetSettlementModal;
