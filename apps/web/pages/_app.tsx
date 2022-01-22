import localforage from "localforage";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { InstallAlert } from "~/components/InstallAlert";
import { NotificationAlert } from "~/components/NotificationAlert";
import { persistConfig, reducer } from "~/store";
import { Header } from "~/components/Header";
import { getLayout, globalStyles, LayoutProps } from "ui";
import { Loading } from "~/components/Loading/Loading";
import { ReduxProvider } from "redox";

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
  globalStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localforage.ready().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider reducer={reducer} persist={persistConfig}>
          <Layout title="TV Show Notifier">
            <InstallAlert />
            <NotificationAlert />
            <Header />
            <Component {...pageProps} />
          </Layout>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
