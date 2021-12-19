import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPeriodForFilter,
  setMembersNumForFilter,
} from "../../redux/reducers/partySlice";
import { dateToStringDash } from "../../utils/dateFunction";
import DatePicker, { registerLocale } from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Calendar(props) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [today, setToday] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };
  const onClickDate = async (date) => {
    setStartDate(date);
    props.setStartDate(dateToStringDash(date));
    dispatch(setPeriodForFilter(0));
    dispatch(setMembersNumForFilter(0));
  };
  return (
    <>
      <DatePicker
        selected={startDate}
        minDate={today}
        onChange={(date) => onClickDate(date)}
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
              margin: "30px 100px",
              fontWeight: "300",
              // fontSize: "30px",
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
              <div className="left-icon">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{ color: "#a5a9f8" }}
                  size="1x"
                />
              </div>
            </div>
            <div className="month-day">
              {getYear(date) + "년  "}
              {getMonth(date) + 1}월
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
              <div className="right-icon">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ color: "#a5a9f8" }}
                  size="1x"
                />
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Calendar;
