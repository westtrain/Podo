import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOtt } from "../API/ottAPI";
import { isError, isNotError } from "../reducers/errorSlice";
import { isLoading, isNotLoading } from "../reducers/loadingSlice";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/party`,
  withCredentials: true,
});

export const createParty = createAsyncThunk(
  "party/createParty",
  async ({ createPartyState }, { dispatch, rejectWithValue }) => {
    await Promise.all([dispatch(dispatch(isLoading()), isNotError())]);
    try {
      console.log(createPartyState);
      await api.post(`/`, createPartyState);
      await Promise.all([dispatch(isNotLoading()), dispatch(isNotError())]);
    } catch (err) {
      await Promise.all([dispatch(isError(err.toJSON()))]);
      return rejectWithValue(err);
    }
  }
);

export const getAllParties = createAsyncThunk(
  "party/getAllParties",
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(isLoading());
    try {
      const parties = await api.get(`/all/${id}`);
      await Promise.all([dispatch(isNotLoading()), dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([
        dispatch(isNotLoading()),
        dispatch(isError(err.toJSON())),
      ]);
      return rejectWithValue(err);
    }
  }
);

export const getFilteredParties = createAsyncThunk(
  "party/getFilteredParties",
  async ({ id, date, period, members_num }, { dispatch, rejectWithValue }) => {
    dispatch(isLoading());
    try {
      let parties = await (
        await api.get(`/filtered/${id}?start_date=${date}`)
      ).data.data;
      console.log(typeof period, typeof members_num);
      if (period || members_num) {
        parties = await getFilterParties(parties, period, members_num);
      }
      await Promise.all([
        dispatch(isNotLoading()),
        dispatch(isNotError()),
        dispatch(getAllOtt()),
      ]);
      return parties;
    } catch (err) {
      await Promise.all([
        dispatch(isNotLoading()),
        dispatch(isError(err.toJSON())),
      ]);
      return rejectWithValue(err);
    }
  }
);

export const getFilterParties = (parties, period, members_num) => {
  let filteredParties = parties;
  console.log(filteredParties, period, members_num);
  if (period) {
    filteredParties = filteredParties.filter(
      (party) => party.period === period
    );
  }
  if (members_num) {
    filteredParties = filteredParties.filter(
      (party) => party.members_num === members_num
    );
  }
  return filteredParties;
};

export const joinParty = createAsyncThunk(
  "party/joinParty",
  async ({ partyId }, { dispatch, rejectWithValue }) => {
    dispatch(isNotError());
    try {
      const parties = await api.patch(`/join`, { party_id: partyId });
      await Promise.all([dispatch(isNotError())]);
    } catch (err) {
      await Promise.all([dispatch(isError(err.toJSON()))]);
      return rejectWithValue(err);
    }
  }
);

export const getUsersParty = createAsyncThunk(
  "party/getUsersParty",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(isNotLoading());
    try {
      const parties = await api.get(`/user`);
      await Promise.all([dispatch(isNotLoading()), dispatch(isNotError())]);
      return parties.data.data;
    } catch (err) {
      await Promise.all([
        dispatch(isNotLoading()),
        dispatch(isError(err.toJSON())),
      ]);
      return rejectWithValue(err);
    }
  }
);
