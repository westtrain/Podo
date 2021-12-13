import React from "react";
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
  return (
    <>
      <div className="middlemain">
        <div className="profile">
          <div className="profilecolor"></div>
          <img src={netflix} alt="user" className="user"></img>
          <div className="username">
            신난보라돌이
            <br />
            넷플릭스 파티
          </div>
        </div>
        <div className="period">
          <div className="title">파티 기간</div>
          <div className="date">2021.12.01 ~ 2022.01.31</div>
        </div>
        <div className="ottlogin">
          <div className="wrapper">
            <div className="title">공유 로그인 정보</div>
            <div className="loginbox">
              <div className="logintitle">아이디</div>
              <div className="logindata">
                kimcoding@gmail.com
                <div className="copyicon">
                  <AiOutlineCopy style={{ color: "#222222" }} size="20px" />
                </div>
              </div>
            </div>
            <div className="loginbox">
              <div className="logintitle">비밀번호</div>
              <div className="logindata">
                ********
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
