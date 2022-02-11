import { QueryFunctionContext } from "react-query";
import { DetailRoot, SearchRoot } from "./episodate.types";

const baseUrl = "https://www.episodate.com/api";

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(baseUrl + url);

  if (response.status !== 200) {
    throw new Error("Episodate API returned Error " + response.status);
  }

  return response.json();
};

const fetchSearch = (name: string, page: number) =>
  fetcher<SearchRoot>(`/search?q=${name}&page=${page}`);

const fetchDetails = (id: number) =>
  fetcher<DetailRoot>(`/show-details?q=${id}`).then((res) => res.tvShow);

export const querySearch = ({
  queryKey,
}: QueryFunctionContext<[string, { name: string; page: number }]>) =>
  fetchSearch(queryKey[1].name, queryKey[1].page);

export const queryDetail = ({
  queryKey,
}: QueryFunctionContext<[string, { id: number }]>) =>
  fetchDetails(queryKey[1].id);

const fetchDetailsBatch = (ids: number[]) => Promise.all(ids.map(fetchDetails));

export const queryDetailBatch = ({
  queryKey,
}: QueryFunctionContext<[string, { ids: number[] }]>) =>
  fetchDetailsBatch(queryKey[1].ids);
