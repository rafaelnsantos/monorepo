import { FC } from "react";
import { ThemeProvider as Provider, useTheme } from "next-themes";
import { useViewHeightFix } from "../hooks/useViewHeightFix";
import Head from "next/head";

interface ThemeProviderOptions {
  darkTheme: any;
  lightTheme: any;
}

interface MetaThemeProps {
  light: string;
  dark: string;
}

const MetaTheme: FC<MetaThemeProps> = ({ light, dark }) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  return (
    <Head>
      <meta
        name="theme-color"
        content={resolvedTheme === "light" ? light : dark}
      />
    </Head>
  );
};

export const ThemeProvider: FC<ThemeProviderOptions> = ({
  darkTheme,
  children,
  lightTheme,
}) => {
  useViewHeightFix();

  return (
    <Provider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: lightTheme.className,
      }}
    >
      <MetaTheme
        light={lightTheme.colors.background.value}
        dark={darkTheme.colors.background.value}
      />
      {children}
    </Provider>
  );
};
