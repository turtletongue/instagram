import {
  NEXT_SLIDER_IMAGE,
  FETCH_SLIDER_IMAGES_SUCCESS,
  FETCH_SLIDER_IMAGES_FAILURE,
  FETCH_SLIDER_IMAGES_START,
  SET_IS_PENDING
} from './signin.constants';

export interface SignInState {
  images: string[];
  currentImageId: number;
  error: string | null;
  isPending: boolean;
}

const initialState: SignInState = {
  images: [],
  currentImageId: 0,
  error: null,
  isPending: true
};

const signInReducer = (state: SignInState=initialState, action: any={}) => {
  switch (action.type) {
    case FETCH_SLIDER_IMAGES_START:
      return { ...state, isPending: true, error: null }
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
      return { ...state, isPending: action.payload };
    default:
      return state;
  }
}

export default signInReducer;