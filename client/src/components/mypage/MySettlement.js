import React from "react";

function MySettlement(props) {
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
                <div>25일</div>
              </div>
              <div className="logoutbtn">계좌 등록</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MySettlement;
