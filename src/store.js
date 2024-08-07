import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "./slices/aiSlice";
import koNameReducer from "./slices/koNameSlice";
import genderReducer from "./slices/genderSlice";
import birthReducer from "./slices/birthSlice";

export default configureStore({
  reducer: {
    ai: aiReducer,
    koName: koNameReducer,
    gender: genderReducer,
    birthYear: birthReducer,
  },
});
