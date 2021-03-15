import { configureStore } from "@reduxjs/toolkit";
import searchInputReducer from "./search-input/search-input.slice";
import signInReducer from "./signin/signin.slice";
import userReducer from "./user/user.slice";

const store = configureStore({
  reducer: {
    signIn: signInReducer,
    user: userReducer,
    searchInput: searchInputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
