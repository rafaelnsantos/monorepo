import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./Button";

export const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";

    setTheme(targetTheme);
  };

  return <Button onClick={toggleTheme}>Switch theme</Button>;
};
