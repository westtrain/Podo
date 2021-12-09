import { createAsyncThunk } from "@reduxjs/toolkit";
//import { logOut } from "../reducers/userSlice";
import axios from "axios";
import { showLoginModal } from "../reducers/modalSlice";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
        withCredentials: true,
      });
      await Promise.all([dispatch(showLoginModal(false))]);
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
