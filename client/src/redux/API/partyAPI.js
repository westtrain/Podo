import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ottList = {
  netflix: 1,
  watcha: 2,
  wavve: 3,
  tving: 4,
  disney: 5,
  prime: 6,
  laftel: 7,
  apple: 8,
  nintendo: 9,
  office: 10,
};
export const getPartyId = (ottName) => {
  return ottList[ottName];
};

export const getFilteredParties = createAsyncThunk(
  "party/getFilteredParties",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const party = await axios.get(
        `${process.env.REACT_APP_API_URL}/party?ott_id=${id}&date=${date}`,
        {
          withCredentials: true,
        }
      );
      return party.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAllParties = createAsyncThunk(
  "party/getAllParties",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const party = await axios.get(`${process.env.REACT_APP_API_URL}/party`, {
        withCredentials: true,
      });
      return party.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
