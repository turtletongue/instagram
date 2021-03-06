import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import signInReducer, { SignInState } from './signin/signin.reducer';
import searchInputReducer, { SearchInputState } from './search-input/search-input.reducer';
import menuReducer, { MenuState } from './menu/menu.reducer';
import postsReducer, { PostsState } from './posts/posts.reducer';

const middlewares: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export interface State {
  signIn: SignInState;
  searchInput: SearchInputState;
  menu: MenuState;
  posts: PostsState;
}

const store: Store = createStore(combineReducers({
  signIn: signInReducer,
  searchInput: searchInputReducer,
  menu: menuReducer,
  posts: postsReducer
}), applyMiddleware(...middlewares));

export default store;