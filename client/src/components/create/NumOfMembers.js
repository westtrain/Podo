import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPartyMembersNum } from "../../redux/reducers/partySlice";
import plus from "../../image/+.png";

function NumOfMembers(props) {
  const dispatch = useDispatch();
  const membersNumState = useSelector(
    (state) => state.party.ceateParty.members_num
  );
  // Plus/Minus 버튼 이벤트
  const onclickVariation = (e) => {
    if (e.target.name === "plus" && membersNumState < 3) {
      dispatch(setPartyMembersNum(membersNumState + 1));
    }
    if (e.target.name === "minus" && membersNumState !== 1) {
      dispatch(setPartyMembersNum(membersNumState - 1));
    }
  };
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
            <img src={plus} name="minus" onClick={onclickVariation} />
            <div className="membermiddle">
              {membersNumState}명
              <div className="payinfo">3명 모집 시 매달 최대 11,425원 적립</div>
            </div>
            <img src={plus} name="plus" onClick={onclickVariation} />
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
