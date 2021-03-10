import { IUser } from "../users/users.interfaces";
import {
  FETCH_SLIDER_IMAGES_FAILURE,
  FETCH_SLIDER_IMAGES_START,
  FETCH_SLIDER_IMAGES_SUCCESS,
  LOGIN_INPUT_CHANGED,
  NEXT_SLIDER_IMAGE,
  PASSWORD_INPUT_CHANGED,
  SET_IS_PENDING,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  TOGGLE_PASSWORD_VISIBILITY,
} from "./signin.constants";

export const setIsPending = (isPending: boolean) => ({
  type: SET_IS_PENDING,
  payload: isPending,
});

export const fetchImages = () => async (dispatch: Function) => {
  dispatch(startFetchImages());
  try {
    dispatch(
      fetchImagesSuccess([
        "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg",
      ])
    );
  } catch (error) {
    dispatch(fetchImagesFailure(error));
  }
};

export const startFetchImages = () => ({
  type: FETCH_SLIDER_IMAGES_START,
});

export const fetchImagesSuccess = (images: string[]) => ({
  type: FETCH_SLIDER_IMAGES_SUCCESS,
  payload: images,
});

export const fetchImagesFailure = (error: Error) => ({
  type: FETCH_SLIDER_IMAGES_FAILURE,
  payload: error.message,
});

export const nextImage = () => ({
  type: NEXT_SLIDER_IMAGE,
});

export const changeLoginInput = (login: string) => ({
  type: LOGIN_INPUT_CHANGED,
  payload: login,
});

export const changePasswordInput = (password: string) => ({
  type: PASSWORD_INPUT_CHANGED,
  payload: password,
});

export const togglePasswordVisibility = () => ({
  type: TOGGLE_PASSWORD_VISIBILITY,
});

export const signIn = (login: string, password: string) => async (
  dispatch: Function
) => {
  dispatch(signInStart());
  try {
    dispatch(
      signInSuccess({
        id: "lustervolt",
        fullname: "Volt Luster",
        description: "Something",
        avatar:
          "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=1c2owR3dgXUAX_0kT91&oh=aac7576ef58864f678d25d50f9b3d691&oe=60685A28",
      })
    );
  } catch (error) {
    dispatch(signInFailure(error));
  }
};

export const signInStart = () => ({
  type: SIGN_IN_START,
});

export const signInSuccess = (user: IUser) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error: Error) => ({
  type: SIGN_IN_FAILURE,
  payload: error.message,
});
