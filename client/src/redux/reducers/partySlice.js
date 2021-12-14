import { createSlice } from "@reduxjs/toolkit";
//import { getParty, getAllParty, getUsersParty } from "./api/partyAPI";
const initialState = {
  party: {},
  ceateParty: {
    ott_id: 0,
    ott_login_id: "",
    ott_login_password: "",
    members: "",
    members_num: 3,
    leader: -1,
    start_date: new Date(),
    end_date: null,
  },
  period: 0,
};

const partySlice = createSlice({
  name: "party",
  initialState: initialState,
  reducers: {
    setMembersNum: (state, action) => {
      state.ceateParty.members_num = action.payload;
      return state;
    },
    setOttId: (state, action) => {
      state.ceateParty.ott_id = action.payload;
      return state;
    },
    setOttLoginId: (state, action) => {
      state.ceateParty.ott_login_id = action.payload;
      return state;
    },
    setOttLoginPw: (state, action) => {
      state.ceateParty.ott_login_password = action.payload;
      return state;
    },
    setStartDate: (state, action) => {
      state.ceateParty.start_date = action.payload;
      return state;
    },
    setEndDate: (state, action) => {
      state.ceateParty.end_date = action.payload;
      return state;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
      return state;
    },
  },
});

export const {
  setMembersNum,
  setOttId,
  setOttLoginId,
  setOttLoginPw,
  setStartDate,
  setEndDate,
  setPeriod,
} = partySlice.actions;
export default partySlice.reducer;
