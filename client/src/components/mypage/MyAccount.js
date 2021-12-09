import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAccountModal } from "../../redux/reducers/modalSlice";
import SetAccountModal from "../modal/SetAccountModal";

function MyAccount(props) {
  const dispatch = useDispatch();
  const accountModalState = useSelector((state) => state.modal.accountModal);
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">인출 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">인출 계좌를 등록해 주세요</div>
              <div
                className="logoutbtn"
                onClick={() => dispatch(showAccountModal(true))}
              >
                계좌 등록
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
