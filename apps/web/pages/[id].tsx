import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout, NextPageWithLayout, Page } from "ui";
import { getDetails } from "~/resources/episodate";
import { DetailTvShow } from "~/resources/episodate.types";

const Home: NextPageWithLayout<DetailTvShow> = (show) => {
  return <Page>{show.name}</Page>;
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
