import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCardModal } from "../../redux/reducers/modalSlice";
import SetCardModal from "../modal/SetCardModal";

function MyPayment(props) {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);
  const cardModalState = useSelector((state) => state.modal.cardModal);
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">
                {" "}
                {paymentState.card_name
                  ? `${paymentState.card_name} ${paymentState.credit_num.slice(
                      0,
                      4
                    )}************`
                  : "결제 카드를 등록해 주세요."}
              </div>
              <div
                className="logoutbtn"
                onClick={() => dispatch(showCardModal(true))}
              >
                {paymentState.card_name ? "변경하기" : "등록하기"}
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
