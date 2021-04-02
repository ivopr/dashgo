import { Button } from "@chakra-ui/react";

interface ItemProps {
  isCurrent?: boolean;
  number: number;
}

export function Item({ isCurrent = false, number }: ItemProps): JSX.Element {
  if (isCurrent) {
    return (
      <Button
        _disabled={{
          bg: "pink.500",
          cursor: "default"
        }}
        colorScheme="pink"
        disabled
        fontSize="xs"
        size="sm"
        w="4">
        {number}
      </Button>
    );
  }

  return (
    <Button
      _hover={{
        bg: "gray.500"
      }}
      bg="gray.700"
      fontSize="xs"
      size="sm"
      w="4">
      {number}
    </Button>
  );
}
