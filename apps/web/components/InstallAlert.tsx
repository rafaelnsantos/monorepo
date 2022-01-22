import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { Box, Button, Text } from "ui";

let deferredPrompt;

export const InstallAlert: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const beforeInstall = async (e) => {
      e.preventDefault();

      deferredPrompt = e;

      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
    };
  }, []);

  if (!show) return null;

  const handleInstall = async () => {
    setShow(false);

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome !== "accepted") {
      setShow(true);
    }
  };

  return (
    <Box css={{ flexDirection: "row", justifyContent: "center" }}>
      <Text>
        This app uses{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API"
          target="_blank"
          rel="noreferrer"
        >
          background periodic sync
        </a>
        , it will work only if installed
      </Text>
      <Button onClick={handleInstall}>Install app</Button>
    </Box>
  );
};
