import { createSlice } from "@reduxjs/toolkit";

const loginURISlice = createSlice({
  name: "loginURI",
  initialState: "/",
  reducers: {
    setLoginCallbackURI(state, action) {
      state = action.payload;
      return state;
    },
    setDefaultURI(state) {
      state = "/";
      return state;
    },
  },
});

export const { setLoginCallbackURI, setDefaultURI } = loginURISlice.actions;
export default loginURISlice.reducer;
