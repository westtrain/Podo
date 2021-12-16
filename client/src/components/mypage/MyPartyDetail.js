import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOttNameById, dateToStringPoint } from "../../utils/dateFunction";
import PartyCard from "./PartyCard";
import "../../style/MyPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineCopy } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import netflix from "../../image/netflix.png";
import member_icon from "../../image/member_icon.png";

function MyPartyDetail(props) {
  const partyId = Number(props.id);
  const userState = useSelector((state) => state.user);
  const usersPartyState = useSelector((state) => state.party.usersParty);
  const thisParty = usersPartyState.filter((party) => party.id === partyId)[0];
  //위의 thisParty로 아래 JSX에서 데이터 알맞게 넣어주시면 됩니다!
  //copy버튼은import { CopyToClipboard } from "react-copy-to-clipboard";
  //이 라이브러리 설치하고 import해서 사용해서 구현하시면 되구요
  //사용법은 Colorbortion의 PalettePage 컴포넌트 보시면 됩니다!
  //그리고 비밀번호에 있는 눈 모양! 구현해주세요~ 보이고 안보이고 버튼은 바뀌는 기능!
  return (
    <>
      <div className="middlemain">
        <div className="profile">
          <div className="profilecolor"></div>
          <img src={netflix} alt="user" className="user"></img>
          <div className="username">
            {userState.name}
            <br />
            {getOttNameById(thisParty.ott_id)} 파티
          </div>
        </div>
        <div className="period">
          <div className="title">파티 기간</div>
          <div className="date">
            {" "}
            {dateToStringPoint(thisParty.start_date)} ~{" "}
            {dateToStringPoint(thisParty.end_date)}
          </div>
        </div>
        <div className="ottlogin">
          <div className="wrapper">
            <div className="title">공유 로그인 정보</div>
            <div className="loginbox">
              <div className="logintitle">아이디</div>
              <div className="logindata">
                {thisParty.ott_login_id}
                <div className="copyicon">
                  <AiOutlineCopy style={{ color: "#222222" }} size="20px" />
                </div>
              </div>
            </div>
            <div className="loginbox">
              <div className="logintitle">비밀번호</div>
              <div className="logindata">
                {thisParty.ott_login_password}
                <div className="copyicon">
                  <FaRegEye style={{ color: "#222222" }} size="20px" />
                </div>
                <div className="copyicon">
                  <AiOutlineCopy style={{ color: "#222222" }} size="20px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="members">
          <div className="wrapper">
            <div className="title">파티 구성원</div>
            <div className="membersbox">
              <div className="member">
                <img src={member_icon} alt="copy" className="copyicon" />
                <div className="membername">신난보라돌이</div>
              </div>
              <div className="member">
                <img src={member_icon} alt="copy" className="copyicon" />
                <div className="membername">춤추는뚜비</div>
              </div>
              <div className="member">
                <img src={member_icon} alt="copy" className="copyicon" />
                <div className="membername">배고픈나나</div>
              </div>
              <div className="member">
                <img src={member_icon} alt="copy" className="copyicon" />
                <div className="membername">행복한뽀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPartyDetail;
