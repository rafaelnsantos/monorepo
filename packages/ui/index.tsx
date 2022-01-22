import { ComponentType, FC } from "react";
import { NextPage } from "next";
import type { LayoutProps } from "./components/Layout";

export * from "./components/Button";
export * from "./components/Box";
export * from "./components/Form";
export * from "./components/Text";
export * from "./components/Layout";
export * from "./stitches.config";
export * from "./components/Page";

const Noop: FC = ({ children }) => <>{children}</>;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout: FC<LayoutProps>;
};

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop;
}
