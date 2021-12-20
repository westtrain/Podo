const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// 빌키 생성 및 저장
const createSubscription = async (data = {}, token) => {
  const requiredParams = ["customer_uid", "card_number", "expiry", "birth", "pwd_2digit"];

  if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
    console.log("insufficient parameters supplied");
    return -1;
  }
  try {
    const result = await axios({
      method: "POST",
      url: `https://api.iamport.kr/subscribe/customers/${data.customer_uid}?_token=${token}`,
      data: data,
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.log("create subscription error");
    return -1;
  }
};

// 빌키 조회
const getSubscription = async (customer_uid, token) => {
  try {
    const result = await axios({
      method: "GET",
      url: `https://api.iamport.kr/subscribe/customers/${customer_uid}?_token=${token}`,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("get subscription error");
    return -1;
  }
};

// 빌키 삭제
const deleteSubscription = async (customer_uid, token) => {
  return await axios({
    method: "DELETE",
    url: `https://api.iamport.kr/subscribe/subscribe/customers/${customer_uid}?_token=${token}`,
  });
};

// 예약 결제 생성
const createSchedule = async (data = {}, token) => {
  /*
  customer_uid: string 타입의 고객 고유번호
  checking_amount: 카드정상결제여부 체크용 금액. 결제 직후 자동으로 취소됩니다. (0원으로 설정할 경우 테스트하지 않음)
  schedules: 결제예약 스케쥴
  */
  const requiredParams = ["user_id", "customer_uid", "checking_amount", "schedules"];
  /* 
  merchant_uid : 가맹점 주문번호(동일한 주문번호로 중복결제 불가)
  schedule_at : 결제요청 예약시각 UNIX timestamp
  currency : 외환부호 e.g.) KRW, USD, ...
  amount : 결제금액
  */
  const requiredParamsSchedules = ["merchant_uid", "schedule_at", "currency", "amount", "name"];

  // 각 파라미터가 잘 전달됬는지 확인 후 필수 항목이 빠졌으면 -1을 반환
  if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
    console.log("insufficient parameters supplied");
    console.log(data);
    return -1;
  }
  if (!requiredParamsSchedules.every((param) => data.schedules[0].hasOwnProperty(param))) {
    console.log("insufficient parameters supplied of schedules");
    return -1;
  }

  try {
    const result = await axios({
      method: "POST",
      url: `https://api.iamport.kr/subscribe/payments/schedule?_token=${token}`,
      data: data,
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.log("create subscription error");
    return -1;
  }
};

// 예약된 결제 요청 삭제
const unschedule = async (data = {}, token) => {
  const requiredParams = ["customer_uid", "merchant_uid"];
  console.log(data);
  if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
    console.log("insufficient parameters supplied");
    return -1;
  }
  try {
    const result = await axios({
      method: "POST",
      url: `https://api.iamport.kr/subscribe/payments/unschedule?_token=${token}`,
      data: data,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    console.log("unsubscription error");
    // return -1;
  }
};

const searchScheduleByCustomersUid = async (data = {}, token) => {
  console.log(data);
  const requiredParams = ["customer_uid", "from", "to"];

  if (!requiredParams.every((param) => data.hasOwnProperty(param))) {
    console.log("insufficient parameters supplied");
    return -1;
  }
  const { customer_uid, from, to, status } = data;
  try {
    const result = await axios({
      method: "GET",
      url: `https://api.iamport.kr/subscribe/payments/schedule/customers/${customer_uid}?from=${from}&to=${to}&schedule-status=${status}&_token=${token}`,
    });
    // console.log(result.data.response.list);
    return result.data.response.list;
  } catch (error) {
    console.log(error);
    console.log("Search schedule by customers_uid error");
    return -1;
  }
};

module.exports = {
  createSubscription,
  getSubscription,
  deleteSubscription,
  createSchedule,
  unschedule,
  searchScheduleByCustomersUid,
};
