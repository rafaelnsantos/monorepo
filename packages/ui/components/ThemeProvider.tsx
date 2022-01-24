import { FC } from "react";
import { ThemeProvider as Provider } from "next-themes";
import { useViewHeightFix } from "../hooks/useViewHeightFix";

interface ThemeProviderOptions {
  darkTheme: any;
  theme: any;
}

export const ThemeProvider: FC<ThemeProviderOptions> = ({
  darkTheme,
  children,
  theme,
}) => {
  useViewHeightFix();

  return (
    <Provider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: theme.className,
      }}
    >
      {children}
    </Provider>
  );
};
