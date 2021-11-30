import React from "react";
import { Link } from "react-router-dom";
import plus from "../../image/+.png";

function NumOfMembers(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step3"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            몇명의 파티원을
            <br />
            모집하실 건가요?
          </div>
        </div>
        <div className="guidemiddle">
          <div className="memberbox">
            <img src={plus} />
            <div className="membermiddle">
              3명
              <div className="payinfo">3명 모집 시 매달 최대 11,425원 적립</div>
            </div>
            <img src={plus} />
          </div>
          <div className="infomember">
            - 파티 운영을 위해서는 최소 1명 이상의 파티원이 필요해요.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/4"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NumOfMembers;
