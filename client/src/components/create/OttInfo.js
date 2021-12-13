import React from "react";
import { Link } from "react-router-dom";

function OttInfo(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step2"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            넷플릭스 프리미엄의
            <br />
            로그인 정보를 입력해 주세요.
          </div>
        </div>
        <div className="guidemiddle">
          <input className="guideinput" type="text" placeholder="아이디" />
          <input
            className="guideinput"
            type="password"
            placeholder="비밀번호"
          />
          <input
            className="guideinput"
            type="paddword"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="guidefooter">
          <Link to={"/create/1"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>

          <Link to={"/create/3"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default OttInfo;
