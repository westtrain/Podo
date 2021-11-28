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
                <div>25 일</div>
              </div>
              <div className="logoutbtn">변경하기</div>
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
