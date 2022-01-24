import { Suspense } from "react";
import { Page } from "ui";
import { Layout, NextPageWithLayout } from "~/components/Layout";
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
