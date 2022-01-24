import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Page, Text } from "ui";
import { Layout, NextPageWithLayout } from "~/components/Layout";
import { getDetails } from "~/resources/episodate";
import { DetailTvShow } from "~/resources/episodate.types";

const Home: NextPageWithLayout<DetailTvShow> = (show) => {
  return (
    <Page>
      <Text as="h1">{show.name}</Text>
      {show.episodes.map((episode) => (
        <Box key={episode.name} css={{ flexDirection: "row" }}>
          <Text css={{ flex: 1 }}>
            S{episode.season} E{episode.episode}
          </Text>
          <Text css={{ flex: 6 }}>{episode.name}</Text>
          <Text>{new Date(episode.air_date).toLocaleString()}</Text>
        </Box>
      ))}
    </Page>
  );
};

Home.Layout = Layout;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<DetailTvShow> = async (context) => {
  const tvShow = await getDetails(context.params?.id as any);

  return {
    props: tvShow,

    revalidate: 3600,

    notFound: (tvShow as any).length === 0,
  };
};

export default Home;
