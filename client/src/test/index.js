import React from "react";
import axios from "axios";

const Login = (props) => {
  const onClickOTT = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ott`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const onClickUser = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const onClickParty = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <>
      <button onClick={onClickOTT}> OTT </button>
      <button onClick={onClickUser}> User </button>
      <button onClick={onClickParty}> Party </button>
    </>
  );
};

export default Login;
