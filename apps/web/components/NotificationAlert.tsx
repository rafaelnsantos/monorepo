import { Button } from "native-base";
import { useNotification } from "~/hooks/useNotification";

export const NotificationAlert = () => {
  const { show, handleClick } = useNotification();

  if (!show) return null;

  return <Button onPress={handleClick}>Allow Notifications</Button>;
};
