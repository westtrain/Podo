import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage에 저장
import ottReducer from "./ottSlice";
import userReducer from "./userSlice";
import paymentSlice from "./paymentSlice";
import partyReducer from "./partySlice";
import modalReducer from "./modalSlice";
import loadingReducer from "./loadingSlice";
import errorReducer from "./errorSlice";

// 리덕스의 store는 페이지를 새로고침 할 경우 state가 사라질 우려가 있어
// 이에 대응하기 위해 redux-persist를 사용
// 아래는 local storage에 저장하는 방식

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["payment", "party", "modal", "loading", "error"],
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    payment: paymentSlice,
    party: partyReducer,
    modal: modalReducer,
    ott: ottReducer,
    loading: loadingReducer,
    error: errorReducer,
  })
);
