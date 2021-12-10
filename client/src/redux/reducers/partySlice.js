import { createSlice } from "@reduxjs/toolkit";
//import { getParty, getAllParty, getUsersParty } from "./api/partyAPI";
const initialState = {
  party: {},
  ceateParty: {
    oot_id: -1,
    oot_login_id: "",
    oot_login_password: "",
    members: "",
    members_num: 3,
    leader: -1,
    start_date: null,
    end_date: null,
  },
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setPartyMembersNum: (state, action) => {
      state.ceateParty.members_num = action.payload;
      return state;
    },
  },
});

export const { setPartyMembersNum } = partySlice.actions;
export default partySlice.reducer;
