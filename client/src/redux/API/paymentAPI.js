import { createAsyncThunk } from "@reduxjs/toolkit";
//import { logOut } from "../reducers/userSlice";
import axios from "axios";

export const getUsersPaymentInfo = createAsyncThunk(
  "user/getUsersPaymentInfo",
  async (_, { rejectWithValue }) => {
    try {
      const paymentInfo = await axios.get(
        `${process.env.REACT_APP_API_URL}/payment`,
        {
          withCredentials: true,
        }
      );
      console.log("api ", paymentInfo);
      return paymentInfo.data[0];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
