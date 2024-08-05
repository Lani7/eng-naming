import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    changeName: (state, action) => {
      state.value = action;
    },
  },
});

export const { changeName } = searchSlice.actions;

export default searchSlice.reducer;
