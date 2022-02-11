import { FC } from "react";
import { InstallButton } from "./InstallButton";
import { NotificationAlert } from "./NotificationAlert";

interface SetupAppProps {
  isPWA: boolean;
}

export const SetupApp: FC<SetupAppProps> = ({ isPWA }) => {
  if (isPWA) return <NotificationAlert />;

  return <InstallButton />;
};
