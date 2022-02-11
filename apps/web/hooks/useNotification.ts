import { useEffect, useState } from "react";

async function registerPeriodicBackground() {
  const status = await navigator.permissions.query({
    name: "periodic-background-sync" as any,
  });
  if (status.state !== "granted") console.error("periodic-background-sync status:" + status.state);

  if (!navigator.serviceWorker) return;

  const registration = (await navigator.serviceWorker.ready) as any;

  if (!registration.periodicSync) return;

  try {
    await registration.periodicSync.register("get-latest-shows", {
      minInterval: 24 * 60 * 60 * 1000,
    });
    console.log("registered");
  } catch (err) {
    console.error(err);
  }
}

export const useNotification = () => {
  const [show, setShow] = useState(Notification.permission !== "granted");

  useEffect(() => {
    if (!show) registerPeriodicBackground();
  }, [show]);

  const handleClick = async () => {
    const permission = await window.Notification.requestPermission();

    setShow(permission !== "granted");
  };

  return { show, handleClick };
};
