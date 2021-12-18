import { createAsyncThunk } from "@reduxjs/toolkit";
import { isError, isNotError } from "../reducers/errorSlice";
import { showAccountModal } from "../reducers/modalSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/payment`,
  withCredentials: true,
});

export const getUsersPaymentInfo = createAsyncThunk(
  "payment/getUsersPaymentInfo",
  async (_, { rejectWithValue }) => {
    try {
      const paymentInfo = await (await api.get(`/`)).data.data[0];
      return paymentInfo;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const updateSettlement = createAsyncThunk(
  "payment/updateSettlement",
  async ({ state }, { dispatch, rejectWithValue }) => {
    try {
      console.log("ff", state);
      const res = await api.post(`/settlement`, state);
      //console.log("RESPONSE", JSON.stringify(res.data));
      await Promise.all([
        dispatch(isNotError()),
        dispatch(getUsersPaymentInfo()),
      ]);
    } catch (err) {
      await Promise.all([dispatch(isError(err.toJSON()))]);
      return rejectWithValue(err);
    }
  }
);

export const updateCard = createAsyncThunk(
  "payment/updateCard",
  async ({ state }, { dispatch, rejectWithValue }) => {
    try {
      await api.post(`/credit`, state);
      await Promise.all([
        dispatch(isNotError()),
        dispatch(getUsersPaymentInfo()),
      ]);
    } catch (err) {
      await Promise.all([dispatch(isError(err.toJSON()))]);

      return rejectWithValue(err);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "payment/updateAccount",
  async ({ state }, { dispatch, rejectWithValue }) => {
    try {
      await api.post(`/account`, state);
      await Promise.all([
        dispatch(isNotError()),
        dispatch(getUsersPaymentInfo()),
        dispatch(showAccountModal(false)),
      ]);
    } catch (err) {
      await Promise.all([dispatch(isError(err.toJSON()))]);

      return rejectWithValue(err);
    }
  }
);
