import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react";
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";

export function Header(): JSX.Element {
  return (
    <Flex align="center" as="header" h="20" mt="4" mx="auto" px="6" w="100%" maxW={1480}>
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" color="pink.500" ml="1">
          .
        </Text>
      </Text>

      <Flex
        alignSelf="center"
        as="label"
        bg="gray.800"
        borderRadius="full"
        color="gray.200"
        flex="1"
        maxW={400}
        ml="6"
        position="relative"
        px="8"
        py="4">
        <Input
          _placeholder={{
            color: "gray.400"
          }}
          color="gray.50"
          mr="4"
          placeholder="Buscar na Plataforma"
          px="4"
          variant="unstyled"
        />

        <Icon as={RiSearchLine} fontSize="24" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          borderColor="gray.700"
          borderRightWidth={1}
          color="gray.300"
          mx="8"
          pr="8"
          py="1"
          spacing="8">
          <Icon as={RiNotificationLine} fontSize={20} />
          <Icon as={RiUserAddLine} fontSize={20} />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Ivo Vieira</Text>
            <Text color="gray.300" fontSize="small">
              ivoprovensi1@gmail.com
            </Text>
          </Box>

          <Avatar name="Ivo Vieira" size="md" src="https://github.com/demotional.png" />
        </Flex>
      </Flex>
    </Flex>
  );
}
