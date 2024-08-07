import { createSlice } from "@reduxjs/toolkit";

// 현재 연도 가져오기
const currentYear = new Date().getFullYear();
// select box 디폴트 선택값
const defaultSelected = currentYear - 20;

export const birthSlice = createSlice({
  name: "birthYear",
  initialState: {
    value: defaultSelected,
  },
  reducers: {
    setBirth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBirth } = birthSlice.actions;

export default birthSlice.reducer;
