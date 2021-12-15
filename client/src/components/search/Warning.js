import React from "react";
import profile5 from "../../image/profile5.svg";

function Warning() {
  return (
    <>
      <div className="noparty">
        <img src={profile5} alt="profile5"></img>
        <div>오늘부터 시작하는 파티가 없어요</div>
        <div>시작 날짜를 선택해 다시 검색해보세요!</div>
      </div>
    </>
  );
}

export default Warning;
