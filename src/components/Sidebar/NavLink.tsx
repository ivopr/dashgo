import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { ActiveLink } from "@components";
import { IconType } from "react-icons";

interface NavLinkProps extends LinkProps {
  href: string;
  icon: IconType;
  name: string;
}

export function NavLink({ href, icon, name, ...rest }: NavLinkProps): JSX.Element {
  return (
    <ActiveLink href={href} passHref>
      <Link align="center" display="flex" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text fontWeight="medium" ml="4">
          {name}
        </Text>
      </Link>
    </ActiveLink>
  );
}
