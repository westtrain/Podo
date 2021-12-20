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

export const refinePrice = (price, members_num) => {
  let refinedPrice = price / members_num;
  refinedPrice = Math.floor(refinedPrice);
  refinedPrice = Math.ceil(refinedPrice / 10) * 10;
  refinedPrice = refinedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return refinedPrice;
};

export const getSavePrice = (price, members_num) => {
  let refinedPrice = price / members_num;
  refinedPrice = Math.floor(refinedPrice);
  refinedPrice = Math.ceil(refinedPrice / 10) * 10;
  refinedPrice *= members_num - 1;
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

export const bankImage = {
  "020": "/woori.svg",
  "088": "/shinhan.svg",
  "003": "/ibk.svg",
  "081": "/hana.svg",
  "004": "/kb.svg",
  "007": "/citi.svg",
  "045": "/ic.svg",
  "011": "/nh.svg",
  "007": "/sh.svg",
  "090": "/kakaobank.png",
  "032": "/busan.svg",
  "039": "/gyeongnam.svg",
  "023": "/sc.png",
  "002": "/kdb.png",
  "071": "/post.png",
  "048": "/shin.svg",
  "037": "/jb.png",
  "034": "/gj.png",
  "089": "/kbank.png",
  "031": "/dgb.png",
  "092": "/toss.png",
};

export const ottImage = {
  netflix: "/netflix.png",
  watcha: "/watcha.png",
  wavve: "/wavve.png",
  tving: "/tving.png",
  disney: "/disney.png",
  prime: "/amazon.png",
  laftel: "/laftel.png",
  apple: "/apple.png",
  office: "/office.png",
  nintendo: "/nintendo.png",
};

export const ottImageClass = {
  netflix: "panel__img pos-1",
  watcha: "panel__img pos-2",
  wavve: "panel__img pos-3",
  tving: "panel__img pos-4",
  disney: "panel__img pos-5",
  prime: "panel__img pos-6",
  laftel: "panel__img pos-7",
  apple: "panel__img pos-8",
  office: "panel__img pos-9",
  nintendo: "panel__img pos-10",
};

export const ottList = {
  netflix: 1,
  watcha: 2,
  wavve: 3,
  tving: 4,
  disney: 5,
  prime: 6,
  laftel: 7,
  apple: 8,
  office: 9,
  nintendo: 10,
};

export const ottKoreanList = {
  넷플릭스: 1,
  왓챠: 2,
  웨이브: 3,
  티빙: 4,
  "디즈니 플러스": 5,
  "프라임 비디오": 6,
  라프텔: 7,
  "애플 TV": 8,
  "오피스 365": 9,
  닌텐도: 10,
};

export const getOttNameById = (ottId) => {
  return Object.keys(ottList).find((ottName) => ottList[ottName] === ottId);
};

export const getOttKoreanNameById = (ottId) => {
  return Object.keys(ottKoreanList).find(
    (ottName) => ottKoreanList[ottName] === ottId
  );
};

export const passwordToStar = (pw) => {
  let result = "";
  for (let i = 0; i < pw.length; i++) result += "*";
  return result;
};
