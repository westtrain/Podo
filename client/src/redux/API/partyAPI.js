import { createAsyncThunk } from "@reduxjs/toolkit";
import { isError, isNotError } from "../reducers/errorSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/party`,
  withCredentials: true,
});

export const createParty = createAsyncThunk(
  "party/createParty",
  async ({ createPartyState }, { dispatch, rejectWithValue }) => {
    await Promise.all([dispatch(isNotError())]);
    try {
      console.log(createPartyState);
      await api.post(`/`, createPartyState);
      await Promise.all([dispatch(isNotError())]);
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);

export const getAllParties = createAsyncThunk(
  "party/getAllParties",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const parties = await api.get(`/all/${id}`);
      await Promise.all([dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);

export const getFilteredParties = createAsyncThunk(
  "party/getFilteredParties",
  async ({ id, date }, { dispatch, rejectWithValue }) => {
    try {
      const parties = await api.get(`/filtered/${id}?start_date=${date}`);
      await Promise.all([dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);

export const getFilterParties = (parties, period, numOfMember) => {
  let filteredParties = parties;
  console.log(filteredParties, period, numOfMember);
  if (period) {
    filteredParties = filteredParties.filter(
      (party) => party.period === period
    );
  }
  if (numOfMember) {
    filteredParties = filteredParties.filter(
      (party) => party.members_num === numOfMember
    );
  }
  return filteredParties;
};

export const joinParty = createAsyncThunk(
  "party/joinParty",
  async ({ partyId }, { dispatch, rejectWithValue }) => {
    try {
      const parties = await api.patch(`/join`, { party_id: partyId });
      await Promise.all([dispatch(isNotError())]);
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);

export const getUsersParty = createAsyncThunk(
  "party/getUsersParty",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const parties = await api.get(`/user`);
      await Promise.all([dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([dispatch(isError(err))]);
      return rejectWithValue(err);
    }
  }
);
