import { TOGGLE_FOCUS_INPUT } from "./search-input.constants"

export interface SearchInputState {
  isFocused: boolean
}

const initialState: SearchInputState = {
  isFocused: false
}

const searchInputReducer = (state: SearchInputState=initialState, action: any={}) => {
  switch (action.type) {
    case TOGGLE_FOCUS_INPUT:
      return { ...state, isFocused: !state.isFocused };
    default:
      return state;
  }
}

export default searchInputReducer;