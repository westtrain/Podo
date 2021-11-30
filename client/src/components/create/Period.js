import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../image/arrow.png";

function Period(props) {
  return (
    <>
      <div className="partyguide">
        <div className="stepline">
          <div className="step4"></div>
        </div>
        <div className="guideheader">
          <div className="guideheadername">
            파티 기간을
            <br />
            설정해 주세요.
          </div>
        </div>
        <div className="guidemiddle">
          <div className="period">
            <div className="periodleft">시작일</div>
            <div className="periodright">
              선택
              <img src={arrow} />
            </div>
          </div>
          <div className="period">
            <div className="periodleft">혜택 기간</div>
            <div className="periodright">
              선택
              <img src={arrow} />
            </div>
          </div>
          <div className="period">
            <div className="periodleft">종료일</div>
            <div className="periodright">
              선택
              <img src={arrow} />
            </div>
          </div>
          <div className="infoperiod">
            - 파티 시작 이후 파티 기간 수정은 불가합니다.
            <br />- 파티 종료일 전에 파티를 해산할 경우 위약금이 발생할 수
            있습니다.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/5"}>
            <div className="guidefooterbtn">
              <div className="nextbtn">다음</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Period;
