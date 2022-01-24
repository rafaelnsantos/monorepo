import { getDetails, getReduxStore, isEpisodeToday } from "./util";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("periodicsync", function (event) {
  if (event.tag !== "get-latest-shows") return;

  getReduxStore(async (store) => {
    try {
      const shows = await Promise.all(store.shows.value.map(getDetails));

      const showsToNotify = shows.filter((show) =>
        show.episodes.some(isEpisodeToday)
      );

      showsToNotify.forEach((show) => {
        const episodesToday = show.episodes.filter(isEpisodeToday);

        episodesToday.forEach((episode) => {
          self.registration.showNotification(
            `New episode: ${show.name} - ${episode.name} today!`,
            {
              body: episode.name,
              image: show.image_thumbnail_path,
              data: {
                id: show.id,
              },
            }
          );
        });
      });
    } catch (err) {
      console.error(err);
    }
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  self.clients.openWindow(`/${event.notification.data.id}`);
});

export {};
