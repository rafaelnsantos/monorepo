import { ComponentProps, FC, forwardRef } from "react";
import { styled } from "../stitches.config";

const StyledButton = styled("button");

export interface ButtonProps extends ComponentProps<typeof StyledButton> {
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
export const Button: FC<ButtonProps> = forwardRef(({ ...props }, ref) => (
  <StyledButton ref={ref} {...props} />
));
