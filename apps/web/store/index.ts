import { showsSlice } from "./shows";
import localforage from "localforage";
import { combineReducers } from "@reduxjs/toolkit";

export const actions = {
  shows: showsSlice.actions,
};

export const reducer = combineReducers({
  shows: showsSlice.reducer,
});

export const persistConfig = {
  key: "root",
  storage: localforage,
  version: 4,
  timeout: process.env.NODE_ENV === "development" ? 500 : undefined,
};

type RootState = ReturnType<typeof reducer>;

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
