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
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const changeCard = async () => {
    api
      .patch(`/credit`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const changeAccount = async () => {
    api
      .patch(
        `/account`,
        { account_bank: "081", account_number: "90691012846907" },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const changeSettlement = async () => {
    api
      .patch(`/settlement`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const enrollCard = async () => {
    api
      .post(`/credit`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const enrollAccount = async () => {
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
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const enrollSettlement = async () => {
    api
      .post(`/settlement`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <>
      <button onClick={getUsersPaymentInfo}>getUsersPaymentInfo</button>
      <button onClick={changeCard}>changeCard</button>
      <button onClick={changeAccount}>changeAccount</button>
      <button onClick={changeSettlement}>changeSettlement</button>
      <button onClick={enrollCard}>enrollCard</button>
      <button onClick={enrollAccount}>enrollAccount</button>
      <button onClick={enrollSettlement}>enrollSettlement</button>
    </>
  );
};

export default payment;
