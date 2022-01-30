import { useRouter } from "next/router";
import { Suspense } from "react";
import { useSwipeable } from "react-swipeable";
import { Page } from "ui";
import { Layout, NextPageWithLayout } from "~/components/Layout";
import { SearchForm } from "~/components/search/SearchForm";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedRight: () => router.push("/"),
  });

  return (
    <Page {...handlers}>
      <Suspense fallback={false}>
        <SearchForm />
      </Suspense>
    </Page>
  );
};

SearchPage.Layout = Layout;

export default SearchPage;
