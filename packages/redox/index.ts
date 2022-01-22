import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";

export const storeBuilder = (
  options: ConfigureStoreOptions,
  persist?: PersistConfig<any>
) => {
  if (!persist) return configureStore(options);

  return persistedStoreBuilder(options, persist);
};

export const persistedStoreBuilder = (
  { reducer, middleware = [], ...options }: ConfigureStoreOptions,
  persist: PersistConfig<any>
) => {
  const persistedReducer = persistReducer(persist, reducer as any);

  return configureStore({
    ...options,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...(typeof middleware === "function"
        ? middleware(getDefaultMiddleware)
        : middleware),
    ],
  });
};

export * from "./Provider";
