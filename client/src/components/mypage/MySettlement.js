import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSettlementModal } from "../../redux/reducers/modalSlice";
import SetSettlementModal from "../modal/SetSettlementModal";

function MySettlement(props) {
  const dispatch = useDispatch();
  const settlementModalState = useSelector(
    (state) => state.modal.settlementModal
  );
  const paymentState = useSelector((state) => state.payment);
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">Podo 정산일 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="settlementbox">
                매월
                <div>{paymentState.settlement_date} 일</div>
              </div>
              <div
                className="logoutbtn"
                onClick={() => dispatch(showSettlementModal(true))}
              >
                {paymentState.settlement_date ? "변경하기" : "등록하기"}
              </div>
              {settlementModalState ? <SetSettlementModal /> : null}
            </div>
            <div className="settlemetntxt">
              Podo에서 파티 요금의 적립과 결제가 기준 날짜를 정산일이라고
              합니다.
              <br />
              <br />
              Podo 정산일은 파티가 진행/예약중인 경우 변경할 수 없어요.
              <br />
              신중하게 선택해 주세요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MySettlement;
