import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/payment`,
  withCredentials: true,
});

const payment = (props) => {
  const getUsersPaymentInfo = async () => {
    api
      .get(`/`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const updateCard = async () => {
    api
      .post(
        `/credit`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const updateAccount = async () => {
    api
      .post(
        `/account`,
        {
          credit_num: null,
          credit_expire_month: null,
          credit_expire_year: null,
          credit_birth: null,
          credit_password: null,
          settlement_date: null,
          account_bank: "081",
          account_number: "90691012846907",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const updateSettlement = async () => {
    api
      .post(
        `/settlement`,
        {
          customer_uid: null,
          credit_num: null,
          cardname: null,
          settlement_date: "15",
          account_bank: null,
          account_number: null,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  return (
    <>
      <button onClick={getUsersPaymentInfo}>getUsersPaymentInfo</button>
      <button onClick={updateCard}>updateCard</button>
      <button onClick={updateAccount}>updateAccount</button>
      <button onClick={updateSettlement}>updateSettlement</button>
    </>
  );
};

export default payment;
