import { Layout, NextPageWithLayout, Page } from "ui";
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
