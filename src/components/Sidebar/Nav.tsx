import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine
} from "react-icons/ri";

import { NavSection } from "./NavSection";

const data = {
  general: [
    {
      name: "Dashboard",
      Icon: RiDashboardLine,
      href: "/dashboard"
    },
    {
      name: "Users",
      Icon: RiContactsLine,
      href: "/users"
    }
  ],
  automation: [
    {
      name: "Forms",
      Icon: RiInputMethodLine,
      href: "/forms"
    },
    {
      name: "Automation",
      Icon: RiGitMergeLine,
      href: "/automation"
    }
  ]
};

export function Nav(): JSX.Element {
  return (
    <Stack align="flex-start" spacing="12">
      <NavSection links={data.general} title="General" />
      <NavSection links={data.automation} title="Automation" />
    </Stack>
  );
}
