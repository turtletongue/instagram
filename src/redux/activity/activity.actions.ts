import {
  FETCH_ACTIVITY_FAILURE,
  FETCH_ACTIVITY_START,
  FETCH_ACTIVITY_SUCCESS,
  FOLLOWING,
} from "./activity.constants";
import { IActivity } from "./activity.interfaces";

export const fetchActivity = () => async (dispatch: Function) => {
  dispatch(fetchActivityStart());
  try {
    dispatch(
      fetchActivitySuccess([{ type: FOLLOWING, authorId: "lustervolt" }])
    );
  } catch (error) {
    dispatch(fetchActivityFailure(error));
  }
};

export const fetchActivityStart = () => ({
  type: FETCH_ACTIVITY_START,
});

export const fetchActivitySuccess = (activities: IActivity[]) => ({
  type: FETCH_ACTIVITY_SUCCESS,
  payload: activities,
});

export const fetchActivityFailure = (error: Error) => ({
  type: FETCH_ACTIVITY_FAILURE,
  payload: error.message,
});
