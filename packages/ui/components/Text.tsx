import { styled } from "../stitches.config";

export const Text = styled("span", {
  variants: {
    size: {
      1: {
        fontSize: "$1",
      },
      2: {
        fontSize: "$2",
      },
      3: {
        fontSize: "$3",
      },
    },
  },

  defaultVariants: {
    size: "2",
  },
});
