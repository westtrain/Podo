import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSettlementModal } from "../../redux/reducers/modalSlice";
import { updateSettlement } from "../../redux/API/paymentAPI";
import { setSettlementDate } from "../../redux/reducers/paymentSlice";
import { onlyNumber } from "../../utils/dateFunction";
import OutsideClickHandler from "react-outside-click-handler";
import Swal from "sweetalert2";
import "../../style/Modal.scss";
import exit from "../../image/exit.png";
function SetSettlementModal(props) {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);
  const errorState = useSelector((state) => state.error);
  const onChangeInput = (e) => {
    e.target.value = onlyNumber(e.target.value);
    if (Number(e.target.value) > 28) e.target.value = "";
    dispatch(setSettlementDate(e.target.value));
  };
  const onClickSubmit = () => {
    if (paymentState.settlementDat !== "") {
      dispatch(updateSettlement({ state: paymentState }));
      if (errorState === null) {
        Swal.fire("Success!", "정산일이 정상적으로 등록되었습니다.", "success");
      }
    }
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
                내가 원하는 날에 모든 파티 요금을 한번에 정산할 수 있어요.{" "}
                <br></br>파티가 시작된 이후, 정산일 변경이 불가능하니 신중히
                설정해주세요.
              </div>

              <div className="ssmmf">
                <div>매월</div>
                <input
                  placeholder="1 ~ 28일 중 입력하세요"
                  onChange={onChangeInput}
                  maxLength="2"
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
