import { createAsyncThunk } from "@reduxjs/toolkit";
import { isError, isNotError } from "../reducers/errorSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/party`,
  withCredentials: true,
});

const ottList = {
  netflix: 1,
  watcha: 2,
  wavve: 3,
  tving: 4,
  disney: 5,
  prime: 6,
  laftel: 7,
  apple: 8,
  office: 9,
  nintendo: 10,
};
export const getOttId = (ottName) => {
  return ottList[ottName];
};

export const getOttName = (ottId) => {
  return Object.keys(ottList).find((ottName) => ottList[ottName] === ottId);
};

export const createParty = createAsyncThunk(
  "party/createParty",
  async ({ createPartyState }, { dispatch, rejectWithValue }) => {
    await Promise.all([dispatch(isNotError())]);
    try {
      console.log(createPartyState);
      await api.post(`/`, createPartyState);
      await Promise.all([dispatch(isNotError())]);
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);
// export const getAllParties = async (id) => {
//   api
//     .get(`/all/${id}`, { withCredentials: true })
//     .then((res) => {
//       console.log("RESPONSE", JSON.stringify(res.data));
//       return res.data.data;
//     })
//     .catch((err) => {
//       console.log("ERROR", JSON.stringify(err.response.data.message));
//     });
// };

export const getAllParties = createAsyncThunk(
  "party/getAllParties",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const parties = await api.get(`/all/${id}`);
      await Promise.all([dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);
