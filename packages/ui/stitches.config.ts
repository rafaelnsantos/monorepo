import { createStitches } from "@stitches/react";
import { Property } from "@stitches/react/types/css";

const defaultColors = {
  text: "hsl(222deg, 22%, 5%)",
  background: "hsl(0deg, 0%, 100%)",
  primary: "hsl(245deg, 100%, 60%)",
  secondary: "hsl(333deg, 100%, 45%)",
  tertiary: "hsl(255deg, 85%, 30%)",
  decorative: "hsl(200deg, 75%, 65%)",
  muted: "hsl(210deg, 55%, 92%)",
  "muted-background": "hsla(210deg, 55%, 92%, 0.85)",
  info: "hsl(245deg, 100%, 60%)",
  success: "hsl(160deg, 100%, 40%)",
  "success-background": "hsla(160deg, 100%, 40%, 0.1)",
  error: "hsl(340deg, 95%, 50%)",
  "error-background": "hsla(340deg, 95%, 43%, 0.1)",
  alert: "hsl(37deg, 100%, 50%)",
  "alert-background": "hsla(52deg, 100%, 50%, 0.25)",
};

export type Colors = typeof defaultColors;

const darkColors: Colors = {
  text: "hsl(0deg, 0%, 100%)",
  background: "hsl(210deg, 30%, 8%)",
  primary: "hsl(230deg, 100%, 67%)",
  secondary: "hsl(333deg, 100%, 52%)",
  tertiary: "hsl(53deg, 100%, 50%)",
  decorative: "hsl(200deg, 50%, 60%)",
  muted: "hsl(210deg, 38%, 15%)",
  "muted-background": "hsla(210deg, 38%, 15%, 0.85)",
  info: "hsl(230deg, 100%, 67%)",
  success: "hsl(160deg, 100%, 40%)",
  "success-background": "hsla(160deg, 100%, 40%, 0.1)",
  error: "hsl(340deg, 95%, 60%)",
  "error-background": "hsla(340deg, 95%, 43%, 0.1)",
  alert: "hsl(30deg, 100%, 50%)",
  "alert-background": "hsla(38deg, 100%, 50%, 0.1)",
};

export type CreateThemeOptions = {
  light?: Partial<Colors>;
  dark?: Partial<Colors>;
};

export const buildStuff = (options?: CreateThemeOptions) => {
  const { createTheme, globalCss, ...stitches } = createStitches({
    theme: {
      fonts: {
        system: "system-ui",
      },
      colors: options?.light
        ? { ...defaultColors, ...options.light }
        : ({} as any),
      fontSizes: {
        1: "13px",
        2: "15px",
        3: "17px",
      },
      space: {
        1: "5px",
        2: "10px",
        3: "15px",
      },
      fontWeights: {
        light: 200,
        normal: 400,
        bold: 700,
      },
      lineHeights: {
        body: 1.5,
        heading: 1.1,
      },
    },
    media: {
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      motion: "(prefers-reduced-motion)",
    },

    utils: {
      mx: (value: Property.MarginRight) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Property.MarginTop) => ({
        marginTop: value,
        marginBottom: value,
      }),
      py: (value: Property.PaddingTop) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      px: (value: Property.PaddingRight) => ({
        paddingRight: value,
        paddingLeft: value,
      }),
    },
  });

  const darkTheme = createTheme({
    colors: options?.dark ? { ...darkColors, ...options.dark } : {},
  });
  const globalStyles = globalCss({
    body: {
      margin: 0,
      padding: 0,
      background: "$background",
      fontFamily: "$system",
      color: "$text",
    },
    "@motion": {
      transition: "dissolve",
      animation: "dissolve",
      background: "blue",
    },
    "#__next": {
      mx: "auto",
      height: "calc(var(--vh, 1vh) * 100)",
      flexDirection: "column",
    },
    a: {
      color: "$primary",
    },
  });

  return { stitches, darkTheme, globalStyles };
};

export const {
  stitches: { styled },
} = buildStuff();
