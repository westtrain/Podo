import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSettlementModal } from "../../redux/reducers/modalSlice";
import { updateSettlement } from "../../redux/API/paymentAPI";
import { setSettlementDate } from "../../redux/reducers/paymentSlice";
import OutsideClickHandler from "react-outside-click-handler";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
function SetSettlementModal(props) {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);

  const onChangeInput = (e) => {
    dispatch(setSettlementDate(e.target.value));
  };
  const onClickSubmit = () => {
    console.log(paymentState);
    dispatch(updateSettlement({ state: paymentState }));
  };
  return (
    <>
      <div className="page">
        <div className="modalback">
          <OutsideClickHandler
            onOutsideClick={() => dispatch(showSettlementModal(false))}
          >
            <div className="setcardmodalview">
              <div className="exit">
                <div>
                  <img
                    src={exit}
                    onClick={() => dispatch(showSettlementModal(false))}
                  ></img>
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
                <input
                  placeholder="1 ~ 28일 중 입력하세요"
                  onChange={onChangeInput}
                />
                <div>일</div>
              </div>

              <div className="clearbtnwrap">
                <button className="clearbtn" onClick={() => onClickSubmit()}>
                  <div className="clearbtnw">완료</div>
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default SetSettlementModal;
