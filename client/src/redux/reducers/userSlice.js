import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // 액션 타입은 슬라이스 이름을 접두어로 사용해서 자동 생성됩니다. -> 'user/logOut'
    // 이에 상응하는 액션 타입을 가진 액션이 디스패치 되면 리듀서가 실행됩니다.
    logOut: {
      // store의 user state가 null이면 isLogin === False과 같은 뜻
      reducer: (state) => {
        state = null;
        return state;
      },
      // 리듀서가 실행되기 이전에 액션의 내용을 편집할 수 있습니다.
      // 즉, 액션 생성 함수에서 데이터를 추가하거나 수정할 때 사용한다.
      //   prepare: (text) => {
      //     const id = nanoid()
      //     return { payload: { id, text } }
      //   },
    },
  },
  // extraReducers는 createSlice가 생성한 액션 타입 외 다른 액션 타입에 응답할 수 있도록 합니다.
  // 슬라이스 리듀서에 맵핑된 내부 액션 타입이 아니라, "외부의 액션"을 참조하려는 의도를 가지고 있습니다.
  // 위의 user/logOut처럼 액션 타입과 상응하는 리듀서가 정의되어 있지 않지만
  //
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, () => {})
      .addCase(logIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(fakeLogIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(socialLogIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(logOut.fulfilled, (state) => {
        state = null;
        return state;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state = null;
        return state;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

const { actions, reducer } = userSlice;
export const { logOut } = actions;
export default reducer;
