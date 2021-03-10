import {
  FETCH_USER_FAILURE,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "./users.constants";
import { IUser } from "./users.interfaces";

export interface UsersState {
  fetchedUsers: IUser[];
  isFetchUserPending: boolean;
  error: string | null;
}

const initialState: UsersState = {
  fetchedUsers: [],
  isFetchUserPending: false,
  error: null,
};

const usersReducer = (state: UsersState = initialState, action: any = {}) => {
  switch (action.type) {
    case FETCH_USER_START:
      return { ...state, isFetchUserPending: true, error: null };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetchUserPending: false,
        error: null,
        fetchedUsers: [...state.fetchedUsers, action.payload],
      };
    case FETCH_USER_FAILURE:
      return { ...state, isFetchUserPending: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
