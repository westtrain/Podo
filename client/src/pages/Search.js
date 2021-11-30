import React, { useState } from "react";
import Header from "../components/public/Header";
import Party from "../components/search/Party";
import DatePicker, { registerLocale } from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { ko } from "date-fns/esm/locale";
import "../style/Search.scss";
import "../style/datepicker.scss";
import netflixname from "../image/NetflixName.png";
import coolicon from "../image/coolicon.png";
import airplane from "../image/airplane.png";
import create_party from "../image/create_party.png";
import arrow_left from "../image/arrow_left.png";
import arrow_right from "../image/arrow_right.png";

function Search(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [months, setMonths] = useState([
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ]);

  const getDayName = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  };
  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  return (
    <>
      <Header />
      <div className="search">
        <div className="searchbody">
          <div className="searchleft">
            <div className="selectott">
              <img src={netflixname} alt="ottname" className="ottname"></img>
              <img src={coolicon} className="coolicon"></img>
            </div>
            <div className="calendar">
              <DatePicker
                selected={startDate}
                minDate={date}
                onChange={(date) => setStartDate(date)}
                inline
                useWeekdaysShort={true}
                shouldCloseOnSelect={false}
                useWeekdaysShort={true}
                renderCustomHeader={({
                  date,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "30px 100px 30px 100px",
                    }}
                  >
                    <div
                      className="btn_month btn_month-prev"
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      <img src={arrow_left} />
                    </div>
                    <div className="month-day">
                      {getYear(date) + "년  "}
                      {months[getMonth(date)]}
                    </div>

                    <div
                      className="btn_month btn_month-next"
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      <img src={arrow_right} />
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="searchleftdown">
              <div className="guidesee">
                <div className="guideseeup">
                  <div className="gsul">가이드보기</div>
                  <div className="gsur">
                    <img
                      src={airplane}
                      alt="airplane"
                      className="airplane"
                    ></img>
                  </div>
                </div>
                <div className="guideseedown">
                  <div>
                    파티 가입에 관한 자세한 정보를
                    <br />
                    확인해 보세요.
                  </div>
                </div>
              </div>
              <div className="createparty">
                <div className="guideseeup">
                  <div className="gsul">파티 만들기</div>
                  <div className="gsur">
                    <img
                      src={create_party}
                      alt="create_party"
                      className="create_party"
                    ></img>
                  </div>
                </div>
                <div className="guideseedown">
                  내가 원하는 조건의
                  <br />
                  파티를 직접 만들어 보세요.
                </div>
              </div>
            </div>
          </div>
          <div className="searchright">
            <div className="searchrightheader">
              <div className="srhleft">
                <select className="period">
                  <option key="period" value="period">
                    파티 기간
                  </option>
                </select>
                <select className="people">
                  <option key="people" value="people">
                    파티 인원
                  </option>
                </select>
              </div>
              <div className="srhright">전체파티 조회</div>
            </div>
            <div className="searchparty">
              <Party />
              <Party />
              <Party />
              <Party />
              <Party />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Search;
