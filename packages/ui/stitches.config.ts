import { createStitches, globalCss } from "@stitches/react";
import { Property } from "@stitches/react/types/css";

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
    },
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
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },

  utils: {
    mx: (value: Property.MarginRight) => ({
      marginLeft: value,
      marginRight: value,
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

export const globalStyles = globalCss({
  body: { margin: 0, padding: 0 },
});
