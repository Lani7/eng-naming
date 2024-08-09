import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    value: "sound",
  },
  reducers: {
    changeType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeType } = typeSlice.actions;

export default typeSlice.reducer;
