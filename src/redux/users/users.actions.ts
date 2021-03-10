import {
  FETCH_USER_FAILURE,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "./users.constants";
import { IUser } from "./users.interfaces";

export const fetchUser = (userId: string) => async (dispatch: Function) => {
  dispatch(fetchUserStart());
  try {
    const data = {
      id: "lustervolt",
      fullname: "Volt Luster",
      description: "Something.",
      avatar:
        "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=1c2owR3dgXUAX_0kT91&oh=aac7576ef58864f678d25d50f9b3d691&oe=60685A28",
    };
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};

export const fetchUserStart = () => ({
  type: FETCH_USER_START,
});

export const fetchUserSuccess = (user: IUser) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: Error) => ({
  type: FETCH_USER_FAILURE,
  payload: error.message,
});
