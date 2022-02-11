import { useEffect } from "react";

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export function useViewHeightFix() {
  useEffect(() => {
    setVh();
  }, []);
}
