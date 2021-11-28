import React from "react";

function MyAccount(props) {
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">인출 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">인출 계좌를 등록해 주세요</div>
              <div className="logoutbtn">계좌 등록</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
