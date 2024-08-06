import { createSlice } from "@reduxjs/toolkit";

export const koNameSlice = createSlice({
  name: "koName",
  initialState: {
    value: "",
  },
  reducers: {
    changeName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeName } = koNameSlice.actions;

export default koNameSlice.reducer;
