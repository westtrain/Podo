import React from "react";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
import check_icon from "../../image/check_icon.png";

function SelectSet() {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <div className="selectratemodalview">
            <div className="exit">
              <div>
                <img src={exit}></img>
              </div>
            </div>
            <div className="srmheader">요금제 선택</div>
            <div className="srmhexp">공유할 요금제를 선택해 주세요.</div>
            <div className="srmmiddle">
              <div className="srmmup">
                <div className="srmmuimg">
                  <img src={check_icon} alt="check"></img>
                </div>
                <div className="srmmuexp">넷플릭스 프리미엄</div>
              </div>
              <div className="srmmdown">
                <div>&middot; 파티원은 최대 3명 모집할 수 있어요</div>
                <div>&middot; 최대 인원 모집 시 매달 11,425원 세이브!</div>
              </div>
            </div>

            <div className="clearbtnwrap">
              <button className="clearbtn">
                <div className="clearbtnw">다음</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectSet;
