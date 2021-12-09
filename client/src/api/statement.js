import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/statement`,
  withCredentials: true,
});
const Statement = (props) => {
  const getPaymentPointWithdrawal = async () => {
    api
      .get(`/`, { withCredentials: true })
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

export default Statement;
