import { useRouter } from "next/router";
import { FC, useEffect, useState, useTransition } from "react";
import { Box, Button, Form } from "ui";
import { useSearch } from "~/resources/episodate";
import { SearchResult } from "./SearchResult";
import classnames from "classnames";
import { Pagination } from "./Pagination";

interface Query {
  name: string;
  page: number;
}

interface FormValues {
  name: string;
}

export const SearchForm: FC = () => {
  const router = useRouter();
  const query = router.query as unknown as Query;
  const [{ name, page }, setParams] = useState(query);

  const [isPending, startTransition] = useTransition();

  const { data } = useSearch(name, page);

  useEffect(() => {
    startTransition(() => {
      setParams({ name: query.name, page: query.page });
    });
  }, [query]);

  const handleSubmit = (values: FormValues) => {
    if (!values.name || (values.name === name && page === 1)) return;

    router.push(`?name=${values.name}&page=1`);
  };

  return (
    <Box
      css={{
        transition: "all 0.2s ease",
        flexDirection: "column",
        "&.loading": {
          pointerEvents: "none",
          opacity: 0.5,
        },
      }}
      className={classnames({ loading: isPending })}
    >
      <Form<FormValues> handleSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          defaultValue={name}
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </Form>
      <SearchResult shows={data?.tv_shows} />
      <Pagination
        pages={data?.pages}
        url={(page) => `/search?name=${name}&page=${page}`}
      />
    </Box>
  );
};
