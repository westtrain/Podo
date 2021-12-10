import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage에 저장
import userReducer from "./userSlice";
import partyReducer from "./partySlice";
import modalReducer from "./modalSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    party: partyReducer,
    modal: modalReducer,
  })
);
