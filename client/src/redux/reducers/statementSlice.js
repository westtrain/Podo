import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getPaymentPointWithdrawal } from "../API/statementAPI";

const initialState = [];

const statementSlice = createSlice({
  name: "statement",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(getPaymentPointWithdrawal.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

const { actions, reducer } = statementSlice;
export default reducer;
