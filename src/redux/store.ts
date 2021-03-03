import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import signInReducer, { SignInState } from './signin/signin.reducer';
import searchInputReducer, { SearchInputState } from './search-input/search-input.reducer';

const middlewares: any[] = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export interface State {
  signIn: SignInState,
  searchInput: SearchInputState
}

const store: Store = createStore(combineReducers({
  signIn: signInReducer,
  searchInput: searchInputReducer
}), applyMiddleware(...middlewares));

export default store;