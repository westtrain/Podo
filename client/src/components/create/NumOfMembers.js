import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMembersNum } from "../../redux/reducers/partySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLeft } from "react-icons/ai";

function NumOfMembers(props) {
  const dispatch = useDispatch();
  const membersNumState = useSelector(
    (state) => state.party.ceateParty.members_num
  );
  // Plus/Minus 버튼 이벤트

  const onClickMinus = () => {
    if (membersNumState !== 1) dispatch(setMembersNum(membersNumState - 1));
  };

  const onClickPlus = () => {
    if (membersNumState < 3) dispatch(setMembersNum(membersNumState + 1));
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
            <div className="updown" onClick={onClickMinus}>
              <FontAwesomeIcon icon={faMinus} size="2x" />
            </div>

            <div className="membermiddle">
              {membersNumState}명
              <div className="payinfo">3명 모집 시 매달 최대 11,425원 적립</div>
            </div>
            <div className="updown" onClick={onClickPlus}>
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </div>
          </div>
          <div className="infomember">
            <div>- 파티 운영을 위해서는 최소 1명 이상의 파티원이 필요해요.</div>
            <div>- 파티장 본인을 제외한 파티원 인원을 선택해주세요!</div>
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/2"}>
            <div className="backbtn">
              <div className="backicon">
                <AiOutlineLeft />
              </div>{" "}
              뒤로가기
            </div>
          </Link>
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
