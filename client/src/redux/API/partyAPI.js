import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOutForce } from "../userSlice";
import { logOutMyLikes } from "../likesSlice";
import { logOutMyReviews } from "../reviewsSlice";
import { setExpireDate } from "../expireDateReducer";
import exceptionAxios from "axios";

export const getParty = createAsyncThunk(
  "party/getParty",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const party = await exceptionAxios.get(`party/${data}`);
      return party.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const getAllParty = createAsyncThunk(
  "party/getAllParty",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const party = await exceptionAxios.get("party");
      return party.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const getUsersParty = createAsyncThunk(
  "party/getUsersParty",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const usersParty = await exceptionAxios.get("party/user");
      return usersParty.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);
