import { SHOW_POSTS, SHOW_SAVED } from "./user-page.constants";

export const showPosts = () => ({
  type: SHOW_POSTS,
});

export const showSaved = () => ({
  type: SHOW_SAVED,
});
