import "raf/polyfill";
import "setimmediate";

import "~/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { persistConfig, reducer } from "~/store";
import { ReduxProvider, useIsLocalForageReady } from "redox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { theme } from "~/styles/theme";
import { ResourceProvider } from "~/resources/Provider";
import { useViewHeightFix } from "~/hooks/useViewHeightFix";

function MyApp({ Component, pageProps }: AppProps) {
  const loaded = useIsLocalForageReady();
  useViewHeightFix();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <GestureHandlerRootView>
        <NativeBaseProvider isSSR theme={theme}>
          <ResourceProvider>
            {loaded && (
              <ReduxProvider reducer={reducer} persist={persistConfig}>
                <Component {...pageProps} />
              </ReduxProvider>
            )}
          </ResourceProvider>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default MyApp;
