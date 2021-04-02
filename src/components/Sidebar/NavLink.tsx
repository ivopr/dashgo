import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavLinkProps extends LinkProps {
  icon: IconType;
  name: string;
}

export function NavLink({ icon, name, ...rest }: NavLinkProps): JSX.Element {
  return (
    <Link align="center" display="flex" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text fontWeight="medium" ml="4">
        {name}
      </Text>
    </Link>
  );
}
