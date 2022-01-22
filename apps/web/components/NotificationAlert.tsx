import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { Box, Button, Text } from "ui";

async function registerPeriodicBackground() {
  const status = await navigator.permissions.query({
    name: "periodic-background-sync" as any,
  });
  if (status.state !== "granted")
    throw new Error("periodic-background-sync status:" + status.state);

  const registration = (await navigator.serviceWorker.ready) as any;

  if (!registration.periodicSync) return;

  try {
    await registration.periodicSync.register("get-latest-shows", {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    console.error(err);
  }
}

export const NotificationAlert: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onMediaChange = (e: MediaQueryListEvent) => {
      setShow(Notification.permission !== "granted" && media.matches);
    };

    registerPeriodicBackground();

    const media = window.matchMedia("(display-mode: standalone)");

    setShow(Notification.permission !== "granted" && media.matches);

    media.addEventListener("change", onMediaChange);

    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  if (!show) return null;

  const handleClick = async () => {
    setShow(false);

    const permission = await window.Notification.requestPermission();

    if (permission === "granted") {
      registerPeriodicBackground();
    } else {
      setShow(true);
    }
  };

  return (
    <Box css={{ flexDirection: "row", justifyContent: "center" }}>
      <Text>Allow notifications</Text>
      <Button onClick={handleClick}>Allow Notifications</Button>
    </Box>
  );
};
