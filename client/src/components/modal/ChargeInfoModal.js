import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { BsXLg } from "react-icons/bs";

function ChargeInfoModal() {
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler>
            <div className="chargeinfomodalview">
              <div className="exit">
                <div>
                  <BsXLg />
                </div>
              </div>
              <div className="pimheader">카드 결제확인 안내</div>

              <div className="pimmiddle">
                <div className="pimmf">
                  등록한 결제 카드가 유효한지 확인하기 위해
                </div>
                <div className="pimmf">
                  <span>1원</span>이 결제 됩니다 :)
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

export default ChargeInfoModal;
