import { CHANGE_POSITION } from "./menu.constants";

export const changePosition = (newPosition: string) => ({
  type: CHANGE_POSITION,
  payload: newPosition
});