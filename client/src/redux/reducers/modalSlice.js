import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../API/userAPI";

const initialState = {
  loginModal: false,
  joinPartyModal: false,
  accountModal: false,
  cardModal: false,
  settlementModal: false,
  withdrawModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    showLoginModal: (state, action) => {
      state.loginModal = action.payload;
      return state;
    },
    showJoinPartyModal: (state, action) => {
      state.joinPartyModal = action.payload;
      return state;
    },
    showAccountModal: (state, action) => {
      state.accountModal = action.payload;
      return state;
    },
    showCardModal: (state, action) => {
      state.cardModal = action.payload;
      return state;
    },
    showSettlementModal: (state, action) => {
      state.settlementModal = action.payload;
      return state;
    },
    showWithdrawModal: (state, action) => {
      state.withdrawModal = action.payload;
      return state;
    },
  },
});

const { actions, reducer } = modalSlice;
export const {
  showLoginModal,
  showJoinPartyModal,
  showAccountModal,
  showCardModal,
  showSettlementModal,
  showWithdrawModal,
} = actions;
export default reducer;
