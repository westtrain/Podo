import React from "react";
import won from "../../image/won.png";

function Party() {
  return (
    <div className="partyexp">
      <div className="partyexpup">
        <div className="peus">
          <span className="peusp">2개월</span>
          파티 지금 시작
        </div>
        <div className="ottfee">
          <img src={won} alt="won" className="won"></img>월 5,575원
        </div>
      </div>
      <div className="partyexpdown">오늘 ~ 2022.01.23 까지</div>
    </div>
  );
}

export default Party;
