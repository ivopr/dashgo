import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "src/contexts/SidebarDrawer";

import { Logo } from "./Logo";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header(): JSX.Element {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex
      align="center"
      as="header"
      h="20"
      mt="4"
      mx="auto"
      px="6"
      w="100%"
      maxW={1480}
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          mr="2"
          onClick={onOpen}
          variant="unstyled"
        />
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <Notifications />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
