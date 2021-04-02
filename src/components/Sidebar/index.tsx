import { Box, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

import { NavSection } from "./NavSection";

const data = {
  general: [
    {
      name: "Dashboard",
      Icon: RiDashboardLine
    },
    {
      name: "Users",
      Icon: RiContactsLine
    }
  ],
  automation: [
    {
      name: "Forms",
      Icon: RiInputMethodLine
    },
    {
      name: "Automation",
      Icon: RiGitMergeLine
    }
  ]
};

export function Sidebar(): JSX.Element {
  return (
    <Box as="aside" mr="8" w="64">
      <Stack align="flex-start" spacing="12">
        <NavSection links={data.general} title="General" />
        <NavSection links={data.automation} title="Automation" />
      </Stack>
    </Box>
  );
}
