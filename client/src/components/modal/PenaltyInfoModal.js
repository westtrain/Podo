import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { BsXLg } from "react-icons/bs";

function PenaltyInfoModal() {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler>
            <div className="penaltyinfomodalview">
              <div className="exit">
                <div>
                  <BsXLg />
                </div>
              </div>
              <div className="pimheader">파티 위약금 안내</div>

              <div className="pimmiddle">
                <div className="pimmf">
                  파티 시작 후, 파티를 탈퇴할 경우 다른 파티원들 위해
                </div>
                <div className="pimmf">위약금이 자동으로 결제 됩니다.</div>
                <div className="pimmf">
                  위약금은 파티 종료까지<span>남은 개월 수 * 월 요금 </span>으로
                  책정됩니다.
                </div>
              </div>

              <div className="clearbtnwrap">
                <button className="clearbtn">
                  <div className="clearbtnw">확인</div>
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default PenaltyInfoModal;
