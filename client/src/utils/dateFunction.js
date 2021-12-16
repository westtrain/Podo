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
export const getMonthString = (strDate) => {
  if (strDate !== "") {
    return strDate.split("-")[1];
  }
  return null;
};
export const dateToStringDash = (date) => {
  if (date) {
    return `${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`;
  }
  return null;
};

export const getDday = (startDate) => {
  let diff = Math.abs(new Date(startDate).getTime() - new Date().getTime());
  diff = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
  return diff;
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

export const refinePrice = (price) => {
  let refinedPrice = Math.floor(price);
  refinedPrice = Math.ceil(refinedPrice / 10) * 10;
  refinedPrice = refinedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return refinedPrice;
};

export const bankList = {
  "020": "우리은행",
  "088": "신한은행",
  "003": "IBK기업은행",
  "081": "하나은행",
  "004": "KB국민은행",
  "007": "씨티은행",
  "045": "새마을금고",
  "011": "NH농협은행",
  "007": "Sh수협은행",
  "090": "카카오뱅크",
  "032": "부산은행",
  "039": "경남은행",
  "023": "SC제일은행",
  "002": "KDB산업은행",
  "071": "우체국은행",
  "048": "신협은행",
  "037": "전북은행",
  "034": "광주은행",
  "089": "케이뱅크은행",
  "031": "대구은행",
  "092": "토스뱅크은행",
};
