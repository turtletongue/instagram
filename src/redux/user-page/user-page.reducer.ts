import {
  POSTS_TAB,
  SAVED_TAB,
  SHOW_POSTS,
  SHOW_SAVED,
} from "./user-page.constants";

export interface UserPageState {
  tab: string;
}

const initialState: UserPageState = {
  tab: POSTS_TAB,
};

const userPageReducer = (
  state: UserPageState = initialState,
  action: any = {}
) => {
  switch (action.type) {
    case SHOW_POSTS:
      return { ...state, tab: POSTS_TAB };
    case SHOW_SAVED:
      return { ...state, tab: SAVED_TAB };
    default:
      return state;
  }
};

export default userPageReducer;
