import {
  SET_IS_PENDING,
  NEXT_SLIDER_IMAGE,
  FETCH_SLIDER_IMAGES_START,
  FETCH_SLIDER_IMAGES_SUCCESS,
  FETCH_SLIDER_IMAGES_FAILURE
} from './signin.constants';

export const setIsPending = (isPending: boolean) => ({
  type: SET_IS_PENDING,
  payload: isPending
});

export const fetchImages = () => async (dispatch: Function) => {
  dispatch(startFetchImages());
  try {
    dispatch(fetchImagesSuccess([
      'https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg',
      'https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg',
      'https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg',
      'https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg'
    ]));
  } catch (error) {
    dispatch(fetchImagesFailure(error));
  }
}

export const startFetchImages = () => ({
  type: FETCH_SLIDER_IMAGES_START,
});

export const fetchImagesSuccess = (images: string[]) => ({
  type: FETCH_SLIDER_IMAGES_SUCCESS,
  payload: images
});

export const fetchImagesFailure = (error: Error) => ({
  type: FETCH_SLIDER_IMAGES_FAILURE,
  payload: error.message
});

export const nextImage = () => ({
  type: NEXT_SLIDER_IMAGE,
});