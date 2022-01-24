import { buildStuff } from "ui";

const { stitches, darkTheme, globalStyles, lightTheme, styled } = buildStuff({
  light: {
    text: "hsl(222deg, 22%, 5%)",
    background: "hsl(0deg, 0%, 100%)",
  },
  dark: {
    text: "hsl(0deg, 0%, 100%)",
    background: "hsl(210deg, 30%, 8%)",
  },
  fonts: {
    primary: "'Fira Sans', sans-serif",
    mono: "'Space Mono', monospace",
  },
});

export const { keyframes, getCssText, reset } = stitches;

export { darkTheme, globalStyles, lightTheme, styled };
