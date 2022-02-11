import { Button } from "native-base";
import { useInstallPWA } from "~/hooks/useInstallPWA";

export const InstallButton = () => {
  const { handleInstall, show } = useInstallPWA();

  if (!show) return null;

  return <Button onPress={handleInstall}>Install</Button>;
};
