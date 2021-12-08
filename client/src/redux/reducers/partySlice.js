import { createSlice } from "@reduxjs/toolkit";
import { getParty, getAllParty, getUsersParty } from "./api/partyAPI";
const initialState = [];

const partySlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    logOutMyParty(state) {
      state = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParty.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(getAllParty.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
      })
      .addCase(getUsersParty.fulfilled, (state, action) => {
        state = state.filter((cur) => cur.id !== action.payload);
        return state;
      })

      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutMyParty } = partySlice.actions;
export default partySlice.reducer;
