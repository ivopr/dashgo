import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormInput } from "@components/Form/Input";

export default function SignIn(): JSX.Element {
  return (
    <Flex align="center" h="100vh" justify="center" w="100vw">
      <Flex as="form" bg="gray.800" borderRadius={8} flexDir="column" w="100%" maxW={360} p={8}>
        <Stack spacing={4}>
          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
        </Stack>

        <Button colorScheme="pink" mt={6} size="lg" type="submit">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
