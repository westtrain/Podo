import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";

export const dateToString = (date) => {
  if (date) {
    return `${getYear(date)}년 ${getMonth(date) + 1}월 ${getDate(date)}일`;
  }
  return null;
};
export const dateToStringPoint = (date) => {
  if (date) {
    return `${getYear(date)}.${getMonth(date) + 1}.${getDate(date)}`;
  }
  return null;
};
