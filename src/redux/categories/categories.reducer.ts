import { CHANGE_ACTIVE_CATEGORY, POSTS } from "./categories.constants";

export interface CategoriesState {
  activeCategory: string;
}

const initialState: CategoriesState = {
  activeCategory: POSTS,
};

const categoriesReducer = (
  state: CategoriesState = initialState,
  action: any = {}
) => {
  switch (action.type) {
    case CHANGE_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
