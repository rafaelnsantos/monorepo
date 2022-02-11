import { useQuery } from "react-query";
import { useState, useCallback, useEffect } from "react";
import { querySearch } from "./episodate";
import { SearchTvShow } from "./episodate.types";

export const useSearch = (name: string) => {
  const [shows, setShows] = useState(new Set<SearchTvShow>());
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [name]);

  const { data, isLoading, isFetched } = useQuery(
    ["search", { name, page }],
    querySearch,
    {
      enabled: !!name,
      onSuccess: (result) => {
        if (result.page === 1) {
          setShows(new Set(result.tv_shows));
        } else {
          setShows(
            (prev) => new Set([...Array.from(prev), ...result.tv_shows])
          );
        }
      },
    }
  );

  const loadMore = useCallback(() => {
    if (!data || page === data.pages) return;
    setPage((prev) => prev + 1);
  }, [data, page]);

  const loading = isLoading && page === 1;

  const loadingMore = isLoading && page !== 1;

  return {
    shows: Array.from(shows),
    loadMore,
    loading,
    loadingMore,
    isFetched,
  };
};
