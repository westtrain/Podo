import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const OTT = (props) => {
  const getPaymentPointWithdrawal = async () => {
    api
      .get(`/statement`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  return (
    <>
      <button onClick={getPaymentPointWithdrawal}>
        getPaymentPointWithdrawal
      </button>
    </>
  );
};

export default OTT;
