import React from "react";
import axios from "axios";
//Filtered까지 함
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const Party = (props) => {
  const getUsersParty = async () => {
    //isAuth 거치기 떄문에 따로 params, query 등 불필요
    api
      .get(`/party`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getParty = async () => {
    api
      .get(`/party/3`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getAllParties = async () => {
    api
      .get(`/party`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getFilteredParties = async () => {
    api
      .get(`/party/filtered?ott_id=1&date=2021-01-10`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const createParty = async () => {
    api
      .post(
        `/party`,
        {
          ott_id: 1,
          ott_login_id: "dnfjk123!@$",
          ott_login_password: "1283njskd@#$%",
          members: "25",
          members_num: 4,
          leader: 3,
          start_date: "2021-12-05",
          end_date: "2022-12-04",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const updateOTTLoginInfo = async () => {
    api
      .patch(
        `/party/ott`,
        {
          party_id: 7,
          ott_login_id: "ott_login",
          ott_login_password: "ott_password",
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
  const changeMemberNum = async () => {
    api
      .patch(
        `/party/memberNum`,
        { party_id: 7, members_num: 5 },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const joinParty = async () => {
    api
      .patch(`/party/join`, { party_id: 10 }, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const leaveParty = async () => {
    api
      .delete(`/party`, {
        data: { party_id: 10 },
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
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

export default Party;
