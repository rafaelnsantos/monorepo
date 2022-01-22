import { Text } from "ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, FC } from "react";

type MyLinkProps = ComponentProps<typeof Link>;

export const MyLink: FC<MyLinkProps> = ({ children, ...props }) => {
  const router = useRouter();
  const disabled = router.asPath === props.href;

  return (
    <Link {...props} passHref>
      <Text
        as={disabled ? "span" : "a"}
        css={{ pointerEvents: disabled ? "none" : "auto" }}
      >
        {children}
      </Text>
    </Link>
  );
};
