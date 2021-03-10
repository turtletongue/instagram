import { TOGGLE_ACTIVITY } from "./menu.constants";

export interface MenuState {
  isActivityOpen: boolean;
}

const initialState: MenuState = {
  isActivityOpen: false,
};

const menuReducer = (state: MenuState = initialState, action: any = {}) => {
  switch (action.type) {
    case TOGGLE_ACTIVITY:
      return { ...state, isActivityOpen: !state.isActivityOpen };
    default:
      return state;
  }
};

export default menuReducer;
