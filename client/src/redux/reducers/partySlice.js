import { createSlice } from "@reduxjs/toolkit";
import {
  createParty,
  getAllParties,
  getFilteredParties,
  joinParty,
  getUsersParty,
} from "../API/partyAPI";
const initialState = {
  // 파티 찾기의 파티 검색을 위한 객체
  parties: {
    ott_id: 1,
    period: 0,
    members_num: 0,
    filteredParty: [], // 시작 날짜와 셀렉트 박스로 개월, 기간까지 필터링된 검색 결과를 위한 파티 배열
  },
  // 파티 만들기를 위한 객제
  ceateParty: {
    ott_id: 0,
    ott_login_id: "",
    ott_login_password: "",
    members_num: 3,
    start_date: "",
    end_date: "",
    period: 0,
  },
  // 마이페이지의 유저가 사용 중인 파티를 위한 배열
  usersParty: [],
};

const partySlice = createSlice({
  name: "party",
  initialState: initialState,
  reducers: {
    setMembersNum: (state, action) => {
      state.ceateParty.members_num = action.payload;
      return state;
    },
    setOttId: (state, action) => {
      state.ceateParty.ott_id = action.payload;
      return state;
    },
    setOttLoginId: (state, action) => {
      state.ceateParty.ott_login_id = action.payload;
      return state;
    },
    setOttLoginPw: (state, action) => {
      state.ceateParty.ott_login_password = action.payload;
      return state;
    },
    setStartDate: (state, action) => {
      state.ceateParty.start_date = action.payload;
      return state;
    },
    setEndDate: (state, action) => {
      state.ceateParty.end_date = action.payload;
      return state;
    },
    setPeriod: (state, action) => {
      state.ceateParty.period = action.payload;
      return state;
    },
    setFilteredParties: (state, action) => {
      state.parties.filteredParty = action.payload;
      return state;
    },
    setPeriodForFilter: (state, action) => {
      state.parties.period = action.payload;
      return state;
    },
    setMembersNumForFilter: (state, action) => {
      state.parties.members_num = action.payload;
      return state;
    },
    logOutParty: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createParty.fulfilled, (action) => {
      console.log("파티 생성 성공");
    });
    builder.addCase(createParty.pending, () => {});
    builder.addCase(createParty.rejected, (action) => {
      console.log(action.payload);
    });
    builder.addCase(getAllParties.fulfilled, (state, action) => {
      state.parties.filteredParty = action.payload;
      return state;
    });
    builder.addCase(getAllParties.rejected, (action) => {
      console.log(action.payload);
    });
    builder.addCase(getFilteredParties.fulfilled, (state, action) => {
      state.parties.filteredParty = action.payload;
      return state;
    });
    builder.addCase(getFilteredParties.rejected, (action) => {
      console.log(action.payload);
    });
    builder.addCase(joinParty.fulfilled, (action) => {
      console.log("파티 가입 성공");
    });
    builder.addCase(joinParty.rejected, (action) => {
      console.log(action.payload);
    });
    builder.addCase(getUsersParty.fulfilled, (state, action) => {
      state.usersParty = action.payload;
      return state;
    });
    builder.addCase(getUsersParty.rejected, (action) => {
      console.log(action.payload);
    });
  },
});

export const {
  setMembersNum,
  setOttId,
  setOttLoginId,
  setOttLoginPw,
  setStartDate,
  setEndDate,
  setPeriod,
  setFilteredParties,
  setPeriodForFilter,
  setMembersNumForFilter,
  logOutParty,
} = partySlice.actions;
export default partySlice.reducer;
