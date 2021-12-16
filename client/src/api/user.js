import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/user`,
  withCredentials: true,
});
const User = (props) => {
  const getUser = async () => {
    api
      .get(`/`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const updateProfileImage = async () => {
    api
      .patch(`/image/3`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const updateMoney = async () => {
    // 유저가 포도머니 1000원 인출시
    api
      .patch(`/money?withdraw=1000`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const deleteUser = async () => {
    api
      .delete(`/`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };
  return (
    <>
      <button onClick={getUser}>getUser</button>
      <button onClick={updateProfileImage}>updateProfileImage</button>
      <button onClick={updateMoney}>updateMoney</button>
      <button onClick={deleteUser}>deleteUser</button>
    </>
  );
};

export default User;
