import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { Page } from "ui";
import { Layout, NextPageWithLayout } from "~/components/Layout";
import { MyShows } from "~/components/MyShows";

const ShowsPage: NextPageWithLayout = () => {
  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedLeft: () => router.push("/search"),
  });

  return (
    <Page {...handlers}>
      <MyShows />
    </Page>
  );
};

ShowsPage.Layout = Layout;

export default ShowsPage;
