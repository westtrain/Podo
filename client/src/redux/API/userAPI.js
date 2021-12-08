import { createAsyncThunk } from "@reduxjs/toolkit";
//import { logOut } from "../reducers/userSlice";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      console.log(user.data.data);
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
