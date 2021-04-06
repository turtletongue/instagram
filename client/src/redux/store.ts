import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activities/activities.slice";
import feedReducer from "./feed/feed.slice";
import headerReducer from "./header/header.slice";
import postPageReducer from "./post-page/post-page.slice";
import profileEditPageReducer from "./profile-edit-page/profile-edit-page.slice";
import searchInputReducer from "./search-input/search-input.slice";
import signInReducer from "./signin/signin.slice";
import signUpReducer from "./signup/signup.slice";
import userPageReducer from "./user-page/user-page.slice";
import userReducer from "./user/user.slice";

const store = configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
    user: userReducer,
    searchInput: searchInputReducer,
    feed: feedReducer,
    userPage: userPageReducer,
    postPage: postPageReducer,
    header: headerReducer,
    activities: activitiesReducer,
    profileEditPage: profileEditPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
