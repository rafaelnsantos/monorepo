import { FC } from "react";
import Head from "next/head";
import { Box } from "ui";
import { Header } from "./Header";
import { InstallAlert } from "./InstallAlert";
import { NotificationAlert } from "./NotificationAlert";
import { NextPage } from "next";

export interface LayoutProps {
  title?: string;
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title, className }) => (
  <>
    {title && (
      <Head>
        <title>{title}</title>
      </Head>
    )}

    <InstallAlert />
    <NotificationAlert />
    <Header />

    <Box
      as="main"
      css={{
        flex: 1,
        px: "$2",
      }}
    >
      {children}
    </Box>
  </>
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout: FC<LayoutProps>;
};
