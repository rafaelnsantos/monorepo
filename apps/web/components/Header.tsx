import { Box, ThemeToggleButton } from "ui";
import { FC } from "react";
import { MyLink } from "./MyLink";

export const Header: FC = () => (
  <Box
    as="header"
    css={{ flexDirection: "row", justifyContent: "space-around" }}
  >
    <MyLink href="/">My Shows</MyLink>
    <MyLink href="/search">Search</MyLink>
    <ThemeToggleButton />
  </Box>
);
