import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/payment`,
  withCredentials: true,
});
export const getUsersPaymentInfo = createAsyncThunk(
  "payment/getUsersPaymentInfo",
  async (_, { rejectWithValue }) => {
    try {
      const paymentInfo = await api.get(`/`).data[0];
      //if (!paymentInfo) return initialState;
      return paymentInfo.data[0];
    } catch (err) {
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
      console.log("RESPONSE", JSON.stringify(res.data));
      await Promise.all([dispatch(getUsersPaymentInfo())]);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
