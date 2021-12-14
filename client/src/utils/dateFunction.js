import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";

export const dateToString = (date) => {
  if (date) {
    return `${getYear(date)}년 ${getMonth(date) + 1}월 ${getDate(date)}일`;
  }
  return null;
};
export const dateToStringPoint = (strDate) => {
  if (strDate !== "") {
    return strDate.split("-").join(".");
  }
  return null;
};
export const dateToStringDash = (date) => {
  if (date) {
    return `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`;
  }
  return null;
};
export const autoHypen = (value) => {
  let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let matches = v.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join("-");
  } else {
    return value;
  }
};

export const onlyNumber = (value) => {
  return value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
};
