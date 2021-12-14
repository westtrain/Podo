import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDate,
  setPeriod as setPeriodState,
} from "../../redux/reducers/partySlice";
import { dateToString } from "../../utils/dateFunction";
import MiniCalendar from "./MiniCalendar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Period(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [startDateToString, setStartDateToString] = useState("");
  const [endDateToString, setEndDateToString] = useState("");
  const [period, setPeriod] = useState(2);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);

  //혜택기간 range input
  const onChangeInput = (e) => {
    const value = Number(e.target.value);
    setPeriod(value);
    dispatch(setPeriodState(value));
    let endDate = new Date(
      startDate.setMonth(startDate.getMonth() + Number(value))
    );
    endDate = new Date(endDate.setDate(startDate.getDate() + Number(value)));
    dispatch(setEndDate(endDate));
    setEndDateToString(dateToString(endDate));
    startDate.setMonth(startDate.getMonth() - Number(value)); //위의 setMonth로 month가 직접 변화가 되어 startDate를 원래대로 돌려준다.
  };

  const onClickNext = () => {
    if (startDateToString === "") {
      Swal.fire("You unchecked!", "파티 기간을 모두 설정해주세요.", "error");
    } else if (endDateToString === "") {
      const endDate = new Date(
        startDate.setMonth(startDate.getMonth() + period)
      );
      dispatch(setEndDate(endDate));
      navigate("/create/5");
    } else {
      navigate("/create/5");
    }
  };
  useEffect(() => {}, [endDateToString]);
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
          <div
            className="period"
            onClick={() => {
              setShowStartCalendar(!showStartCalendar);
              if (showPeriod) setShowPeriod(false);
            }}
          >
            <div className="periodleft">시작일</div>
            <div className="periodright">
              {startDateToString === "" ? "선택" : startDateToString}
              <div className="arrow">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>
          </div>
          {showStartCalendar ? (
            <div className="calendal">
              <MiniCalendar
                setStartDate={setStartDate}
                setStartDateToString={setStartDateToString}
              />
            </div>
          ) : null}
          <div
            className="period"
            onClick={() => {
              if (startDateToString === "") {
                Swal.fire("You unchecked!", "시작일을 선택해주세요.", "error");
              } else {
                setShowPeriod(!showPeriod);
                if (showStartCalendar) setShowStartCalendar(false);
              }
            }}
          >
            <div className="periodleft">혜택 기간</div>
            <div className="periodright">
              {endDateToString === "" ? "선택" : `${period}개월`}
              <div className="arrow">
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
              </div>
            </div>
          </div>
          {showPeriod ? (
            <div className="setperiod">
              <div className="setperiodheader">
                최소 2개월 이상의 파티만 만들 수 있어요.
              </div>
              <div className="setperiodmiddle">
                <div className="setperiodmp">{period}개월</div>
                <input
                  type="range"
                  className="setperiodbar"
                  min="2"
                  max="12"
                  step="1"
                  list="tickmarks"
                  value={period}
                  onInput={onChangeInput}
                />
                <datalist id="tickmarks">
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value="4"></option>
                  <option value="5"></option>
                  <option value="6"></option>
                  <option value="7"></option>
                  <option value="8"></option>
                  <option value="9"></option>
                  <option value="10"></option>
                  <option value="11"></option>
                  <option value="12"></option>
                </datalist>
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
            <div className="guidefooterbtn"onClick={onClickNext}>
              <div className="nextbtn">다음</div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Period;
