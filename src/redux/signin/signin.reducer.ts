import {
  NEXT_SLIDER_IMAGE,
  FETCH_SLIDER_IMAGES_SUCCESS,
  FETCH_SLIDER_IMAGES_FAILURE,
  FETCH_SLIDER_IMAGES_START,
  SET_IS_PENDING,
  LOGIN_INPUT_CHANGED,
  PASSWORD_INPUT_CHANGED,
  TOGGLE_PASSWORD_VISIBILITY,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE
} from './signin.constants';
import { IUser } from './signin.interfaces';

export interface SignInState {
  images: string[];
  currentImageId: number;
  error: string | null;
  isImagesPending: boolean;
  login: string;
  password: string;
  isPasswordVisible: boolean;
  isAuth: boolean;
  user: IUser | null,
  isSignInPending: boolean;
}

const initialState: SignInState = {
  images: [],
  currentImageId: 0,
  error: null,
  isImagesPending: false,
  login: '',
  password: '',
  isPasswordVisible: false,
  isAuth: false,
  user: null,
  isSignInPending: false,
};

const signInReducer = (state: SignInState=initialState, action: any={}) => {
  switch (action.type) {
    case FETCH_SLIDER_IMAGES_START:
      return { ...state, isImagesPending: true, error: null }
    case FETCH_SLIDER_IMAGES_SUCCESS:
      return { ...state, images: action.payload, error: null };
    case FETCH_SLIDER_IMAGES_FAILURE:
      return { ...state, error: action.payload };
    case NEXT_SLIDER_IMAGE:
      return {
        ...state,
        currentImageId: (state.currentImageId  >= state.images.length - 1) ?
          0 : state.currentImageId + 1
      };
    case SET_IS_PENDING:
      return { ...state, isImagesPending: action.payload };
    case LOGIN_INPUT_CHANGED:
      return { ...state, login: action.payload };
    case PASSWORD_INPUT_CHANGED:
      return { ...state, password: action.payload };
    case TOGGLE_PASSWORD_VISIBILITY:
      return { ...state, isPasswordVisible: !state.isPasswordVisible };
    case SIGN_IN_START:
      return { ...state, isSignInPending: true };
    case SIGN_IN_SUCCESS:
      return { ...state, isAuth: true, user: action.payload, isSignInPending: false };
    case SIGN_IN_FAILURE:
      return { ...state, error: action.payload, isSignInPending: false }
    default:
      return state;
  }
}

export default signInReducer;