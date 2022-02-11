import { useState, useEffect } from "react";
import localforage from "localforage";

export const useIsLocalForageReady = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    localforage.ready().then(() => setLoaded(true));
  }, []);

  return loaded;
};
