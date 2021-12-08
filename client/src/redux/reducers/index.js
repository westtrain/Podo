import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage에 저장
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    // rootReducer
    user: userReducer,
  })
);
