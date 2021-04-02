import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile(): JSX.Element {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Ivo Vieira</Text>
        <Text color="gray.300" fontSize="small">
          ivoprovensi1@gmail.com
        </Text>
      </Box>

      <Avatar name="Ivo Vieira" size="md" src="https://github.com/demotional.png" />
    </Flex>
  );
}
