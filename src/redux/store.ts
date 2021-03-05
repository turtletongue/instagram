import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import signInReducer, { SignInState } from './signin/signin.reducer';
import searchInputReducer, { SearchInputState } from './search-input/search-input.reducer';
import menuReducer, { MenuState } from './menu/menu.reducer';

const middlewares: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export interface State {
  signIn: SignInState,
  searchInput: SearchInputState,
  menu: MenuState
}

const store: Store = createStore(combineReducers({
  signIn: signInReducer,
  searchInput: searchInputReducer,
  menu: menuReducer
}), applyMiddleware(...middlewares));

export default store;