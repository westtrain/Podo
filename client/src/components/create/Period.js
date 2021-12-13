import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../image/arrow.png";
import MiniCalendar from "./MiniCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Period(props) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showSetPeriod, setShowSetPeriod] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [period, setPeriod] = useState(2);

  const hadleStartCalendal = () => {
    setShowStartCalendar(!showStartCalendar);
  };

  const hadleSetPeriod = () => {
    setShowSetPeriod(!showSetPeriod);
  };

  const hadleEndCalendal = () => {
    setShowEndCalendar(!showEndCalendar);
  };

  const onClickDate = (some) => {
    console.log("??", some);
  };

  return (
    <>
      <div className="partyguidestep4">
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
          <div className="period" onClick={hadleStartCalendal}>
            <div className="periodleft">시작일</div>
            <div className="periodright">
              선택
              <div className="arrow">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>
          </div>
          {showStartCalendar ? (
            <div className="calendal">
              <MiniCalendar />
            </div>
          ) : null}
          <div className="period" onClick={hadleSetPeriod}>
            <div className="periodleft">혜택 기간</div>
            <div className="periodright">
              선택
              <div className="arrow">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>
          </div>
          {showSetPeriod ? (
            <div className="setperiod">
              <div className="setperiodheader">
                최소 2개월 이상의 파티만 만들 수 있어요.
              </div>
              <div className="setperiodmiddle">
                <div className="setperiodmp">{period}개월</div>
                <input type="range" className="setperiodbar" step="10"></input>
                <div className="setperiodnum">
                  <div>2</div>
                  <div>&nbsp;&nbsp;3</div>
                  <div>&nbsp;&nbsp;4</div>
                  <div>&nbsp;5</div>
                  <div>&nbsp;6</div>
                  <div>&nbsp;&nbsp;7</div>
                  <div>&nbsp;8</div>
                  <div>&nbsp;9</div>
                  <div>10</div>
                  <div>11</div>
                  <div>12</div>
                </div>
                <div className="unit">
                  <div>(개월)</div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="period" onClick={hadleEndCalendal}>
            <div className="periodleft">종료일</div>
            <div className="periodright">
              선택
              <div className="arrow">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>
          </div>
          {showEndCalendar ? (
            <div className="calendal">
              <MiniCalendar />
            </div>
          ) : null}
          <div className="infoperiod">
            - 파티 시작 이후 파티 기간 수정은 불가합니다.
            <br />- 파티 종료일 전에 파티를 해산할 경우 위약금이 발생할 수
            있습니다.
          </div>
        </div>
        <div className="guidefooter">
          <Link to={"/create/3"}>
            <div className="backbtn">
              <div className="backicon">&#60;</div> 뒤로가기
            </div>
          </Link>
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
