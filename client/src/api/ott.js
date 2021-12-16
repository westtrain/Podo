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
        console.log("RESPONSE", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  return (
    <>
      <button onClick={onClickOTT}>OTT</button>
    </>
  );
};

export default OTT;
