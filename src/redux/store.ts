import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authReducers from './reducers/authReducers'
import todoReducer from './reducers/todoReducer';



const persistConfig = {
  key: 'root',
  storage,
}


export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    auth: authReducers,
    todos: todoReducer
  })),
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch | any;