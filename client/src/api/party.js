import React from "react";
import axios from "axios";
//Filtered까지 함
const Party = (props) => {
  const getUsersParty = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getParty = async (party_id) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party/${party_id}`, {
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/party`, { withCredentials: true })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getFilteredParties = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/party/filtered?ott_id=1&date=2021-01-10`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const createParty = async () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/party`,
        {
          ott_id: 1,
          ott_login_id: "dnfjk123!@$",
          ott_login_password: "1283njskd@#$%",
          members: "3",
          members_num: 4,
          leader: 3,
          start_date: "2021-12-05",
          end_date: "2022-12-04",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("RESPONSE", res);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const updateOTTLoginInfo = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party/ott`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const changeMemberNum = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const joinParty = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/party`,
        { party_id: 1 },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("RESPONSE", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  const leaveParty = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/party`, {
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
