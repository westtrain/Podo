import { createAsyncThunk } from "@reduxjs/toolkit";
import { isError, isNotError } from "../reducers/errorSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/ott`,
  withCredentials: true,
});

export const getAllOtt = createAsyncThunk(
  "ott/getAllOtt",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const ott = await api.get(`/`, { withCredentials: true });
      await Promise.all([dispatch(isNotError())]);
      return ott.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);
