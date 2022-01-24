import { styled } from "../stitches.config";

export const Page = styled("div", {
  width: "100vw",
  mx: "auto",
  py: "$1",
  "@md": {
    maxWidth: "70vw",
  },
  "@lg": {
    maxWidth: "60vw",
  },
});
