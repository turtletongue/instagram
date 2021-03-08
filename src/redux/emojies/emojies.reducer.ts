import { FETCH_EMOJIES_FAILURE, FETCH_EMOJIES_SUCCESS } from "./emojies.constants";
import { IEmoji } from "./emojies.interfaces";

export interface EmojiesState {
  emojiesData: IEmoji[];
  error: string | null;
}

const initialState = {
  emojiesData: [],
  error: null
};

const emojiesReducer = (state: EmojiesState=initialState, action: any={}) => {
  switch (action.type) {
    case FETCH_EMOJIES_SUCCESS:
      return { ...state, emojiesData: action.payload, error: null };
    case FETCH_EMOJIES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default emojiesReducer;