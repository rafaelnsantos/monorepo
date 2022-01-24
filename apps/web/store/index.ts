import { showsSlice } from "./shows";
import localforage from "localforage";
import { combineReducers } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/es/types";

export const actions = {
  shows: showsSlice.actions,
};

export const reducer = combineReducers({
  shows: showsSlice.reducer,
});

type RootState = ReturnType<typeof reducer>;

export const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: localforage,
  version: 4,
  timeout: process.env.NODE_ENV === "development" ? 500 : undefined,
};

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
