import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import localStorage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage: localStorage,
    version: 1
  }

const combinedReducers = combineReducers({
  User: userReducer,
  Post: postReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
});


export default store;