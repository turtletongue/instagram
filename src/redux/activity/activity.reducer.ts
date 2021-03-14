import {
  FETCH_ACTIVITY_FAILURE,
  FETCH_ACTIVITY_START,
  FETCH_ACTIVITY_SUCCESS,
} from "./activity.constants";
import { IActivity } from "./activity.interfaces";

export interface ActivityState {
  isActivitiesPending: boolean;
  activities: IActivity[];
  error: string | null;
}

const initialState: ActivityState = {
  isActivitiesPending: false,
  activities: [],
  error: null,
};

const activitiesReducer = (
  state: ActivityState = initialState,
  action: any = {}
) => {
  switch (action.type) {
    case FETCH_ACTIVITY_START:
      return { ...state, isActivitiesPending: true, error: null };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        isActivitiesPending: false,
        activities: action.payload,
      };
    case FETCH_ACTIVITY_FAILURE:
      return { ...state, isActivitiesPending: false, error: action.payload };
    default:
      return state;
  }
};

export default activitiesReducer;
