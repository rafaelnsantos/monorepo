import { FC } from "react";
import Head from "next/head";
import { Box } from "./Box";

export interface LayoutProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title }) => (
  <Box
    css={{
      mx: "auto",
      height: "100vh",
      flexDirection: "column",
    }}
  >
    {title && (
      <Head>
        <title>{title} - Vercel Examples</title>
      </Head>
    )}

    <Box
      as="main"
      css={{
        px: "$2",
      }}
    >
      {children}
    </Box>
  </Box>
);
