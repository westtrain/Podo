import React from "react";
import { Link } from "react-router-dom";
import check from "../../image/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ConfirmRule(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step5"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            파티 규칙을
            <br />
            확인해 보세요.
          </div>
        </div>
        <div className="guidemiddle">
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            넷플릭스 프리미엄 로그인 정보를 정확히 확인했습니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            파티 기간은 2021.11.15~2022.9.14 약 10개월입니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            성인 인증을 완료했으며, 공유해도 안전한 로그인 정보입니다.
          </div>
          <div className="rulebox">
            <div className="check">
              <FontAwesomeIcon
                icon={faCheck}
                size="1x"
                style={{ color: "#4040cc" }}
              />
            </div>
            파티장 귀책시, 최대 20,790원의 위약금이 부과될 수 있습니다.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/4"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>
          <Link to={"/create/6"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ConfirmRule;
