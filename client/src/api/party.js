import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/party`,
  withCredentials: true,
});

const party = (props) => {
  const getUsersParty = async () => {
    //isAuth 거치기 떄문에 따로 params, query 등 불필요
    api
      .get("/user", { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const getParty = async () => {
    api
      .get(`/1`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const getAllParties = async () => {
    api
      .get(`/all/1`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response));
      });
  };

  const getFilteredParties = async () => {
    api
      .get(`/filtered/7?start_date=2021-12-20`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const createParty = async () => {
    api
      .post(
        `/`,
        {
          ott_id: 3,
          ott_login_id: "dnfjk123!@$",
          ott_login_password: "1283njskd@#$%",
          members: "4",
          members_num: 4,
          leader: 3,
          period: 3,
          start_date: "2021-12-17",
          end_date: "2022-10-16",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response));
      });
  };

  const updateOTTLoginInfo = async () => {
    api
      .patch(
        `/ott`,
        {
          party_id: 7,
          ott_login_id: "ott_login",
          ott_login_password: "ott_password",
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

  const changeMemberNum = async () => {
    api
      .patch(
        `/memberNum`,
        { party_id: 7, members_num: 5 },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const joinParty = async () => {
    api
      .patch(`/join`, { party_id: 1 }, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  const leaveParty = async () => {
    api
      .delete(`/`, {
        data: { party_id: 2 },
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response.data.message));
      });
  };

  return (
    <>
      <p>Get</p>
      <button onClick={getUsersParty}>getUsersParty</button>
      <button onClick={getParty}>getParty</button>
      <button onClick={getAllParties}>getAllParties</button>
      <button onClick={getFilteredParties}>getFilteredParties</button>
      <p>Post</p>
      <button onClick={createParty}>createParty</button>
      <p>Patch</p>
      <button onClick={updateOTTLoginInfo}>updateOTTLoginInfo</button>
      <button onClick={changeMemberNum}>changeMemberNum</button>
      <button onClick={joinParty}>joinParty</button>
      <p>Delete</p>
      <button onClick={leaveParty}>leaveParty</button>
    </>
  );
};

export default party;
