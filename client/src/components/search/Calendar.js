import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { ko } from "date-fns/esm/locale";
import arrow_left from "../../image/arrow_left.png";
import arrow_right from "../../image/arrow_right.png";

function Calendar(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());
  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };
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

  return (
    <>
      <DatePicker
        selected={startDate}
        minDate={today}
        onChange={(date) => setStartDate(date)}
        inline
        useWeekdaysShort={true}
        shouldCloseOnSelect={false}
        useWeekdaysShort={true}
        onMonthChange={handleMonthChange}
        dayClassName={(date) => {
          return getMonth(date) !== month ? "notcurrentmonth" : undefined;
        }}
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
              fontWeight: "300",
              fontSize: "30px",
            }}
          >
            <div
              className="btn_month btn_month-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              style={{
                display: "flex",
                alignContent: "center",
                cursor: "pointer",
              }}
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
              style={{
                display: "flex",
                alignContent: "center",
                cursor: "pointer",
              }}
            >
              <img src={arrow_right} />
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Calendar;
