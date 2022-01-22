import { QueryFunctionContext, useQuery } from "react-query";
import { fetcher } from "~/worker/util";
import { DetailRoot, SearchRoot } from "./episodate.types";

const baseUrl = "https://www.episodate.com/api";

const getSearch = (name: string, page: number) =>
  fetcher<SearchRoot>(`${baseUrl}/search?q=${name}&page=${page}`);

export const getDetails = (id: number) =>
  fetcher<DetailRoot>(`${baseUrl}/show-details?q=${id}`).then(
    (res) => res.tvShow
  );

const querySearch = ({
  queryKey,
}: QueryFunctionContext<[string, { name: string; page: number }]>) =>
  getSearch(queryKey[1].name, queryKey[1].page);

const queryDetail = ({
  queryKey,
}: QueryFunctionContext<[string, { id: number }]>) =>
  getDetails(queryKey[1].id);

export const useDetail = (id: number) =>
  useQuery(["detail", { id }], queryDetail);

export const useSearch = (name: string, page: number) =>
  useQuery(["search", { name, page }], querySearch, {
    enabled: !!name,
  });
