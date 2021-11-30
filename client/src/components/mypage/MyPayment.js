import React from "react";

function MyPayment(props) {
  return (
    <>
      <div className="middlemain">
        <div className="adminbox">
          <div className="wrapper">
            <div className="title">결제 수단 관리</div>
            <hr className="line" />
            <div className="logininfo">
              <div className="nowlogininfo">등록한 결제 수단이 없어요</div>
              <div className="logoutbtn">카드 등록</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPayment;
