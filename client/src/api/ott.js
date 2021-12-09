import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/ott`,
  withCredentials: true,
});

const OTT = (props) => {
  const onClickOTT = async () => {
    api
      .get("/", { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <>
      <button onClick={onClickOTT}>OTT</button>
    </>
  );
};

export default OTT;
