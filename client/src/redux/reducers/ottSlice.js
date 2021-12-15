import { createSlice } from "@reduxjs/toolkit";
import { getAllOtt } from "../API/ottAPI";

const initialState = [];

const partySlice = createSlice({
  name: "ott",
  initialState: initialState,
  reducers: {
    setOtt: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOtt.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const { setOtt } = partySlice.actions;
export default partySlice.reducer;
