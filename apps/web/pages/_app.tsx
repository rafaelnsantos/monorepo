import localforage from "localforage";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistConfig, reducer } from "~/store";
import { getLayout, ThemeProvider } from "ui";
import { Loading } from "~/components/Loading/Loading";
import { ReduxProvider } from "redox";
import { darkTheme, globalStyles, lightTheme } from "~/stitches.config";
import { LayoutProps } from "~/components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localforage.ready().then(() => {
      setLoading(false);
    });
  }, []);
  globalStyles();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
          {loading ? (
            <Loading />
          ) : (
            <ReduxProvider reducer={reducer} persist={persistConfig}>
              <Layout title="TV Show Notifier">
                <Component {...pageProps} />
              </Layout>
            </ReduxProvider>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
