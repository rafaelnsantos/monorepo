import { useRouter } from "next/router";
import { FC } from "react";
import { Box, Button } from "ui";
import { MyLink } from "../MyLink";

interface PaginationProps {
  pages?: number;
  url: (page: number) => string;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const pages = Array.from(Array(props.pages), (_, i) => i + 1);

  if (!props.pages) return null;

  return (
    <Box css={{ flexWrap: "wrap", justifyContent: "center" }}>
      {pages.map((page) => (
        <MyLink key={page} href={props.url(page)}>
          {page}
        </MyLink>
      ))}
    </Box>
  );
};
