import { CHANGE_POSITION, HOME } from "./menu.constants";

export interface MenuState {
  position: string;
}

const initialState: MenuState = {
  position: HOME
};

const menuReducer = (state: MenuState=initialState, action: any={}) => {
  switch (action.type) {
    case CHANGE_POSITION:
      return { ...state, position: action.payload };
    default:
      return state;
  }
}

export default menuReducer;