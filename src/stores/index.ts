import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from 'stores/store';

const reducer = combineReducers({
  notes: userReducer,
});

export type RootState = ReturnType<typeof reducer>;

const store = configureStore({ reducer });

export default store;
