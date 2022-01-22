import { showsSlice } from "./shows";
import localforage from "localforage";
import { workerSlice } from "./worker";
import { combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const actions = {
  shows: showsSlice.actions,
};

export const reducer = combineReducers({
  shows: showsSlice.reducer,
  worker: workerSlice.reducer,
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
