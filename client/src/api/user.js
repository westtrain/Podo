import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const User = (props) => {
  const getUser = async () => {
    api
      .get(`/user`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const updateMoney = async () => {
    api
      .patch(`/user/money`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const deleteUser = async () => {
    api
      .delete(`/user?withdraw=1000`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  return (
    <>
      <button onClick={getUser}>getUser</button>
      <button onClick={updateMoney}>updateMoney</button>
      <button onClick={deleteUser}>deleteUser</button>
    </>
  );
};

export default User;
