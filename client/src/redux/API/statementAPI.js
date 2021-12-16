import { createAsyncThunk } from "@reduxjs/toolkit";
import { isError, isNotError } from "../reducers/errorSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/statement`,
  withCredentials: true,
});

export const getPaymentPointWithdrawal = createAsyncThunk(
  "statement/getPaymentPointWithdrawal",
  async (_, { dispatch, rejectWithValue }) => {
    await Promise.all([dispatch(isNotError())]);
    try {
      console.log("dddddddddddddddd");
      const statements = await api.get(`/`);
      console.log(statements.data.data);
      await Promise.all([dispatch(isNotError())]);
      return statements.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);
