import { buildStuff } from "ui";

const { stitches, darkTheme, globalStyles } = buildStuff({
  light: {
    text: "hsl(222deg, 22%, 5%)",
    background: "hsl(0deg, 0%, 100%)",
  },
  dark: {
    text: "hsl(0deg, 0%, 100%)",
    background: "hsl(210deg, 30%, 8%)",
  },
});

export const { styled, theme, keyframes, getCssText, reset } = stitches;

export { darkTheme, globalStyles };
