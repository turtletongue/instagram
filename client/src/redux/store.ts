import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activities/activities.slice";
import emojiesReducer from "./emojies/emojies.slice";
import feedReducer from "./feed/feed.slice";
import fullCommentsReducer from "./full-comments/full-comments.slice";
import headerReducer from "./header/header.slice";
import postPageReducer from "./post-page/post-page.slice";
import profileEditPageReducer from "./profile-edit-page/profile-edit-page.slice";
import searchInputReducer from "./search-input/search-input.slice";
import signInReducer from "./signin/signin.slice";
import userPageReducer from "./user-page/user-page.slice";
import userReducer from "./user/user.slice";

const store = configureStore({
  reducer: {
    signIn: signInReducer,
    user: userReducer,
    searchInput: searchInputReducer,
    feed: feedReducer,
    fullComments: fullCommentsReducer,
    userPage: userPageReducer,
    postPage: postPageReducer,
    emojies: emojiesReducer,
    header: headerReducer,
    activities: activitiesReducer,
    profileEditPage: profileEditPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;