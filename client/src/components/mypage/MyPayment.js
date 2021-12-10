import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCardModal } from "../../redux/reducers/modalSlice";
import SetCardModal from "../modal/SetCardModal";

function MyPayment(props) {
  const dispatch = useDispatch();
  const cardModalState = useSelector((state) => state.modal.cardModal);
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">등록한 결제 수단이 없어요</div>
              <div
                className="logoutbtn"
                onClick={() => dispatch(showCardModal(true))}
              >
                카드 등록
              </div>
              {cardModalState ? <SetCardModal /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPayment;
