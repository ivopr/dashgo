import { Box, Stack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

import { NavLink } from "./NavLink";

interface NavSectionProps {
  links: {
    name: string;
    Icon: IconType;
  }[];
  title: string;
}

export function NavSection({ links, title }: NavSectionProps): JSX.Element {
  return (
    <Box>
      <Text color="gray.400" fontSize="small" fontWeight="bold" textTransform="uppercase">
        {title}
      </Text>

      <Stack align="stretch" mt="8" spacing="4">
        {links.map((link) => (
          <NavLink icon={link.Icon} name={link.name} key={link.name} />
        ))}
      </Stack>
    </Box>
  );
}
