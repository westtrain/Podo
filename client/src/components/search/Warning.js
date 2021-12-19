import React from "react";
import profile5 from "../../image/profile5.svg";

function Warning() {
  return (
    <>
      <div className="noparty">
        <img src={profile5} alt="profile5"></img>
        <div>조건에 맞는 파티가 없어요</div>
        <div>시작일을 선택해 다시 검색해보세요!</div>
      </div>
    </>
  );
}

export default Warning;
