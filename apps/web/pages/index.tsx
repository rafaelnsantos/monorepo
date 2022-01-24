import { Page } from "ui";
import { Layout, NextPageWithLayout } from "~/components/Layout";
import { MyShows } from "~/components/MyShows";

const ShowsPage: NextPageWithLayout = () => {
  return (
    <Page>
      <MyShows />
    </Page>
  );
};

ShowsPage.Layout = Layout;

export default ShowsPage;
