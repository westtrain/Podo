import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut } from "../reducers/userSlice";
import axios from "axios";

export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.post("/auth/naver", data);
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      dispatch(setExpireDate(Date.now()));
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
///
export const naverLogIn = createAsyncThunk(
  "user/naverLogIn",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.get("/auth/naver");
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      dispatch(setExpireDate(Date.now()));
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.get("/user", {
        headers: {
          cookie: `Bearer ${result.data.access_token}`,
        },
      });
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      dispatch(setExpireDate(Date.now()));
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
