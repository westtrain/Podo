import React from "react";
import axios from "axios";

const Login = (props) => {
  const onClickOTT = async () => {
    axios
      .get("https://server.podorang.com/ott", { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const onClickUser = async () => {
    axios
      .get("https://server.podorang.com/user", { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const onClickParty = async () => {
    axios
      .get("https://server.podorang.com/party", { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("err", err);
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
