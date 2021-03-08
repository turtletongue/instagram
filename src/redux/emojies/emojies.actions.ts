import { FETCH_EMOJIES_FAILURE, FETCH_EMOJIES_START, FETCH_EMOJIES_SUCCESS } from "./emojies.constants";
import { IEmoji } from "./emojies.interfaces";

export const fetchEmojies = () => async (dispatch: any) => {
  dispatch(fetchEmojiesStart());
  try {
    dispatch(fetchEmojiesSuccess([
      { id: 1, content: '😀' },
      { id: 2, content: '🤩' },
      { id: 3, content: '☺' },
      { id: 4, content: '👺' },
      { id: 5, content: '❤' }
    ]));
  } catch (error) {
    dispatch(fetchEmojiesFailure(error));
  }
}

export const fetchEmojiesStart = () => ({
  type: FETCH_EMOJIES_START,
});

export const fetchEmojiesSuccess = (emojies: IEmoji[]) => ({
  type: FETCH_EMOJIES_SUCCESS,
  payload: emojies
});

export const fetchEmojiesFailure = (error: Error) => ({
  type: FETCH_EMOJIES_FAILURE,
  payload: error.message
});