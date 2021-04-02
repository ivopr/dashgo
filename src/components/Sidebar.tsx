import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

export function Sidebar(): JSX.Element {
  return (
    <Box as="aside" mr="8" w="64">
      <Stack align="flex-start" spacing="12">
        <Box>
          <Text color="gray.400" fontSize="small" fontWeight="bold" textTransform="uppercase">
            General
          </Text>

          <Stack align="stretch" mt="8" spacing="4">
            <Link align="center" display="flex">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text fontWeight="medium" ml="4">
                Dashboard
              </Text>
            </Link>

            <Link align="center" display="flex">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text fontWeight="medium" ml="4">
                Users
              </Text>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text color="gray.400" fontSize="small" fontWeight="bold" textTransform="uppercase">
            Automation
          </Text>

          <Stack align="stretch" mt="8" spacing="4">
            <Link align="center" display="flex">
              <Icon as={RiInputMethodLine} fontSize="20" />
              <Text fontWeight="medium" ml="4">
                Forms
              </Text>
            </Link>

            <Link align="center" display="flex">
              <Icon as={RiGitMergeLine} fontSize="20" />
              <Text fontWeight="medium" ml="4">
                Automation
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
