import { Suspense } from "react";
import { Layout, NextPageWithLayout, Page } from "ui";
import { SearchForm } from "~/components/search/SearchForm";

const SearchPage: NextPageWithLayout = () => {
  return (
    <Page>
      <Suspense fallback={false}>
        <SearchForm />
      </Suspense>
    </Page>
  );
};

SearchPage.Layout = Layout;

export default SearchPage;
