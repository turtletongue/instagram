import { CHANGE_ACTIVE_CATEGORY } from "./categories.constants";

export const changeActiveCategory = (categoryName: string) => ({
  type: CHANGE_ACTIVE_CATEGORY,
  payload: categoryName,
});
