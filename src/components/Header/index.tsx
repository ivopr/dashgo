import { Flex } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header(): JSX.Element {
  return (
    <Flex align="center" as="header" h="20" mt="4" mx="auto" px="6" w="100%" maxW={1480}>
      <Logo />

      <SearchBox />

      <Flex align="center" ml="auto">
        <Notifications />

        <Profile />
      </Flex>
    </Flex>
  );
}
