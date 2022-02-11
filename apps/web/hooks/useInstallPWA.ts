import { useEffect, useState } from "react";
import { Platform } from "react-native";

let deferredPrompt: any;

export const useInstallPWA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const beforeInstall = async (e: Event) => {
      e.preventDefault();

      deferredPrompt = e;

      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    setShow(outcome !== "accepted");
  };

  return { show, handleInstall };
};
