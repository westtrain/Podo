import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//import { logOut } from "../reducers/userSlice";
import axios from "axios";
import { showLoginModal } from "../reducers/modalSlice";
import { getUsersParty } from "./partyAPI";
import { getUsersPaymentInfo } from "./paymentAPI";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/user`,
  withCredentials: true,
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await api.get(`/`, {
        withCredentials: true,
      });
      await Promise.all([
        dispatch(showLoginModal(false)),
        dispatch(getUsersParty()),
        dispatch(getUsersPaymentInfo()),
      ]);
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateProfileImage = async (id) => {
  api
    .patch(`/image/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("ERROR");
    });
};

export const deleteUser = async () => {
  api
    .delete(`/`, { withCredentials: true })
    .then((res) => {
      console.log("RESPONSE");
    })
    .catch((err) => {
      console.log("ERROR");
    });
};
