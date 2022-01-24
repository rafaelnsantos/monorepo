import { FC, useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PersistConfig, persistStore } from "redux-persist";
import { storeBuilder } from ".";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

interface ReduxProviderProps extends ConfigureStoreOptions {
  persist?: PersistConfig<any>;
}

export const ReduxProvider: FC<ReduxProviderProps> = ({
  children,
  persist,
  ...options
}) => {
  const store = useMemo(
    () => storeBuilder(options, persist),
    [options, persist]
  );

  return (
    <Provider store={store}>
      {persist ? (
        <PersistGate persistor={persistStore(store)}>{children}</PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};
