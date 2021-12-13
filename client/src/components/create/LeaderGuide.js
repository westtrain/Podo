import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function LeaderGuide(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step1"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername_step1">
            파티장 가이드를
            <br />
            확인하세요
          </div>
          <div className="guideottname">넷플릭스 프리미엄</div>
        </div>
        <div className="guidemiddle">
          <div className="guidemiddleheader">
            파티장의 로그인 정보는 파티원과 공유됩니다.
          </div>
          <div className="guidemiddlebody">
            공유 가능한 안전한 비밀번호를 사용해 주세요
          </div>

          <div className="guidemiddleheader">
            성인 인증이 완료된 계정만 공유할 수 있어요.
          </div>
          <div className="guidemiddlebody">
            성인 인증이 완료되지 않은 계정을 사용할 경우, 파티원의 서비스 <br />
            이용에 불편을 끼칠 수 있어요.
          </div>
          <div className="checkguide">
            <FontAwesomeIcon icon={faCheckCircle} size="1x" />
            <span>위 파티장 가이드를 모두 확인 했습니다.</span>
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>
          <Link to={"/create/2"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeaderGuide;
