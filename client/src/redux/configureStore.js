// import { configureStore } from "@reduxjs/toolkit";
// // import loggerMiddleware from 'redux-logger';
// import userReducer from "./reducers/userReducer";
// import customMiddleware from "./middlewares/customMiddleware";

// // 리듀서에는 단일 함수를 전달하여 스토어의 루트 리듀서(root reducer)로 바로 사용할 수 있습니다.
// // 또한 슬라이스 리듀서들로 구성된 객체를 전달하여 루트 리듀서를 생성하도록 할 수 있습니다.
// // 이런 경우에는 내부적으로 기존 리덕스 combineReducers 함수를 사용해서
// // 자동적으로 병합하여 루트 리듀서를 생성합니다.
// const rootReducer = {
//   user: userReducer,
// };
// // initalState의 역할
// const preloadedState = {
//   user: {
//     isLogin: false,
//     userinfo: {},
//   },
// };

// export default configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(logger),
//   devTools: process.env.NODE_ENV !== "production",
//   preloadedState,
// });

import { configureStore } from "@reduxjs/toolkit";
// import loggerMiddleware from 'redux-logger';
import { persistedReducer } from "./reducers/index";

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
