import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAccountModal } from "../../redux/reducers/modalSlice";
import { bankList } from "../../utils/dateFunction";
import SetAccountModal from "../modal/SetAccountModal";

function MyAccount(props) {
  const dispatch = useDispatch();
  const accountModalState = useSelector((state) => state.modal.accountModal);
  const paymentState = useSelector((state) => state.payment);

  useEffect(() => {}, [paymentState]);
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">인출 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">
                {paymentState.account_bank
                  ? `${bankList[paymentState.account_bank]} ${
                      paymentState.account_number
                    }`
                  : "인출 계좌를 등록해 주세요."}
              </div>
              <div
                className="logoutbtn"
                onClick={() => dispatch(showAccountModal(true))}
              >
                {paymentState.account_bank ? "계좌 변경" : "계좌 등록"}
              </div>
              {accountModalState ? <SetAccountModal /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
