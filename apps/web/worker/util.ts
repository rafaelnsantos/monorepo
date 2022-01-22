import { DefaultRootState } from "react-redux";
import { DetailRoot, Episode } from "~/resources/episodate.types";

export const fetcher = async <T>(
  url: string,
  body?: unknown,
  method = "GET"
): Promise<T> => {
  const response = await fetch(url, {
    body: method !== "GET" ? JSON.stringify(body) : undefined,
    method,
    headers:
      method !== "GET" ? { "content-type": "application/json" } : undefined,
  });

  if (response.status !== 200) {
    throw new Error("Episodate API returned Error " + response.status);
  }

  return response.json();
};

export const getReduxStore = (
  onSuccess: (values: DefaultRootState) => void,
  onError?: (error: DOMException) => void
) => {
  const request = indexedDB.open("localforage");

  request.onerror = function () {
    console.error(this.error);
  };

  request.onsuccess = function () {
    const transaction = this.result.transaction("keyvaluepairs", "readonly");

    const dbRequest = transaction
      .objectStore("keyvaluepairs")
      .get("persist:root");

    dbRequest.onerror = function () {
      console.error(this.error);
    };

    dbRequest.onsuccess = function () {
      const storeString = this.result as string;

      const store: DefaultRootState = JSON.parse(
        storeString
          .replaceAll(`:"`, ":")
          .replaceAll(`}"`, "}")
          .replaceAll("\\", "")
      );
      onSuccess(store);
    };
  };
};

export const getDetails = (id: number) =>
  fetcher<DetailRoot>(
    `https://www.episodate.com/api/show-details?q=${id}`
  ).then((res) => res.tvShow);

export const isEpisodeToday = (episode: Episode) => {
  const date = new Date(episode.air_date);
  const now = new Date();

  return date.setHours(0, 0, 0, 0) == now.setHours(0, 0, 0, 0);
};
