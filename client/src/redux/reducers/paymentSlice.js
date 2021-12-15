import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getUsersPaymentInfo, updateSettlement } from "../API/paymentAPI";

const initialState = {
  credit_num: null,
  credit_expire_month: null,
  credit_expire_year: null,
  credit_birth: null,
  credit_password: null,
  settlement_date: null,
  account_bank: null,
  account_number: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    setSettlementDate: (state, action) => {
      console.log(action.payload);
      state.settlement_date = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersPaymentInfo.fulfilled, (state, action) => {
      if (action.payload === {} || !action.payload) {
        return initialState;
      }
      state = action.payload;
      return state;
    });
    builder.addCase(updateSettlement.fulfilled, () => {});
    // .addCase(signUp.fulfilled, () => {})
    // .addCase(logIn.fulfilled, (state, action) => {
    //   state = action.payload;
    //   return state;
    // })

    // .addCase(fakeLogIn.fulfilled, (state, action) => {
    //   state = action.payload;
    //   return state;
    // })
    // .addCase(socialLogIn.fulfilled, (state, action) => {
    //   state = action.payload;
    //   return state;
    // })
    // .addCase(logOut.fulfilled, (state) => {
    //   state = null;
    //   return state;
    // })
    // .addCase(updateUserInfo.fulfilled, (state, action) => {
    //   state = action.payload;
    //   return state;
    // })
    // .addCase(deleteUser.fulfilled, (state) => {
    //   state = null;
    //   return state;
    // })
    // .addDefaultCase((state) => {
    //   return state;
    // });
  },
});

export const { setSettlementDate } = paymentSlice.actions;
export default paymentSlice.reducer;
