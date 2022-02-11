import { useEffect } from "react";
import { SearchForm } from "~/components/Search/SearchForm";
import { MyShows } from "~/components/MyShows/MyShows";
import { useDispatch } from "react-redux";
import { actions } from "~/store";
import { ShowModal } from "~/components/ShowDetail/ShowModal";
import { SetupApp } from "~/components/SetupApp";
import { useColorModeValue, useTheme, View } from "native-base";
import { NextPage } from "next";
import Head from "next/head";

interface AppProps {
  id?: string;
  isPWA?: boolean;
}

const App: NextPage = () => {
  const params = new URLSearchParams(window.location.search);
  const theme = useTheme();
  const isPWA = params.get("mode") === "standalone";

  const id = params.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(actions.shows.selectShow(+id));
  }, [id, dispatch]);

  return (
    <View
      height="calc(var(--vh, 1vh) * 100)"
      _dark={{ bg: "backgroundDark" }}
      _light={{ bg: "backgroundLight" }}
    >
      <Head>
        <meta
          name="theme-color"
          content={useColorModeValue(
            theme.colors.backgroundLight,
            theme.colors.backgroundDark
          )}
        />
        <link
          rel="manifest"
          href={`/manifest.json?colorMode=${useColorModeValue(
            "light",
            "dark"
          )}`}
        />
      </Head>
      <SetupApp isPWA={isPWA} />
      <MyShows />
      <SearchForm />
      <ShowModal />
    </View>
  );
};

export default App;
