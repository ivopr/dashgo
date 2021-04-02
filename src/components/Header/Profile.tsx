import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Ivo Vieira</Text>
          <Text color="gray.300" fontSize="small">
            ivoprovensi1@gmail.com
          </Text>
        </Box>
      )}

      <Avatar name="Ivo Vieira" size="md" src="https://github.com/demotional.png" />
    </Flex>
  );
}
