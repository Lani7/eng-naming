import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "./slices/aiSlice";
import searchReducer from "./slices/searchSlice";

export default configureStore({
  reducer: {
    ai: aiReducer,
    search: searchReducer,
  },
});
