import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox(): JSX.Element {
  const [search, setSearch] = useState("");

  return (
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
      py="4"
    >
      <Input
        _placeholder={{
          color: "gray.400"
        }}
        color="gray.50"
        mr="4"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar na Plataforma"
        px="4"
        value={search}
        variant="unstyled"
      />

      <Icon as={RiSearchLine} fontSize="24" />
    </Flex>
  );
}
