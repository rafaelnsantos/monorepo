import { ComponentType, FC } from "react";

export * from "./components/Button";
export * from "./components/Box";
export * from "./components/Form";
export * from "./components/Text";
export * from "./stitches.config";
export * from "./components/Page";
export * from "./components/ThemeProvider";
export * from "./components/ToggleThemeButton";

const Noop: FC = ({ children }) => <>{children}</>;

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop;
}
