import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  dateToStringPoint,
  getOttKoreanNameById,
  passwordToStar,
} from "../../utils/dateFunction";
import PartyCard from "./PartyCard";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../../style/MyPage.scss";
import { AiOutlineCopy } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import netflix from "../../image/netflix.png";
import watcha from "../../image/watcha.png";
import wavve from "../../image/wavve.png";
import tving from "../../image/tving.png";
import disney from "../../image/disney.png";
import amazon from "../../image/amazon.png";
import laftel from "../../image/laftel.png";
import apple from "../../image/apple.png";
import office from "../../image/office.png";
import nintendo from "../../image/nintendo.png";
import profile0 from "../../image/profile0.svg";
import profile1 from "../../image/profile1.svg";
import profile2 from "../../image/profile2.svg";
import profile3 from "../../image/profile3.svg";
import profile4 from "../../image/profile4.svg";
import profile5 from "../../image/profile5.svg";
import profile6 from "../../image/profile6.svg";
import profile7 from "../../image/profile7.svg";
import profile8 from "../../image/profile8.svg";
import profile9 from "../../image/profile9.svg";
import profile10 from "../../image/profile10.svg";
import profile11 from "../../image/profile11.svg";
import profile13 from "../../image/profile13.svg";
function MyPartyDetail(props) {
  const partyId = Number(props.id);
  const userState = useSelector((state) => state.user);
  const usersPartyState = useSelector((state) => state.party.usersParty);
  const thisParty = usersPartyState.filter((party) => party.id === partyId)[0];
  const [isBlind, setIsBlind] = useState(true);
  const membersName = thisParty.memberName.filter(
    (name) => name !== userState.name
  ); // 유저 본인 외의 멤버 이름만 사용
  console.log(membersName);

  const ottLogoList = [
    netflix,
    watcha,
    wavve,
    tving,
    disney,
    amazon,
    laftel,
    apple,
    office,
    nintendo,
  ];
  const profileImgList = [
    profile0,
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
    profile9,
    profile10,
    profile11,
  ];

  const getRenderMembers = () => {
    const result = [];
    for (let i = 0; i < thisParty.members_num - 1; i++) {
      if (i <= membersName.length - 1) {
        result.push(
          <div className="member">
            <img
              src={profileImgList[Math.floor(Math.random() * 10) + 2]}
              alt="copy"
              className="copyicon"
            />
            <div className="membername">{membersName[i]}</div>
          </div>
        );
      } else {
        // 멤버가 파티 정원만큼 차지 않은 상태
        result.push(
          <div className="member">
            <img src={profile13} alt="copy" className="copyicon" />
            <div className="membername">모집중</div>
          </div>
        );
      }
    }
    return result;
  };
  return (
    <>
      <div className="middlemain">
        <div className="profile">
          <div className="profilecolor"></div>
          <img
            src={ottLogoList[thisParty.ott_id - 1]}
            alt="user"
            className="user"
          ></img>
          <div className="username">
            {userState.name}의
            <br />
            {getOttKoreanNameById(thisParty.ott_id)} 파티
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
                <CopyToClipboard text={thisParty.ott_login_id}>
                  <div className="copyicon">
                    <AiOutlineCopy style={{ color: "#222222" }} size="20px" />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            <div className="loginbox">
              <div className="logintitle">비밀번호</div>
              <div className="logindata">
                {isBlind
                  ? passwordToStar(thisParty.ott_login_password)
                  : thisParty.ott_login_password}

                <div className="copyicon" onClick={() => setIsBlind(!isBlind)}>
                  {isBlind ? (
                    <FaRegEye style={{ color: "#222222" }} size="20px" />
                  ) : (
                    <FaRegEyeSlash style={{ color: "#222222" }} size="20px" />
                  )}
                </div>
                <CopyToClipboard text={thisParty.ott_login_password}>
                  <div className="copyicon">
                    <AiOutlineCopy style={{ color: "#222222" }} size="20px" />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
        <div className="members">
          <div className="wrapper">
            <div className="title">파티 구성원</div>
            <div className="membersbox">
              <div className="member">
                <img
                  src={profileImgList[userState.image]}
                  alt="copy"
                  className="copyicon"
                />
                <div className="membername">{userState.name}</div>
              </div>
              {getRenderMembers()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPartyDetail;
