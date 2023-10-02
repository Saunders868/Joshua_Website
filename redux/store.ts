import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import cartReducer from "./slices/cart.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};

type UserReducer = ReturnType<typeof userReducer>;
type CartReducer = ReturnType<typeof cartReducer>;

const persistedUserReducer = persistReducer<UserReducer>(persistConfig, userReducer);
const persistedCartReducer = persistReducer<CartReducer>(persistConfig, cartReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  cart: persistedCartReducer
});

export const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   user: persistedUserReducer,
  //   cart: persistedCartReducer
  // },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
