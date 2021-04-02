import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { FormInput, Header, Sidebar } from "@components";
import NextLink from "next/link";

export default function UserCreate(): JSX.Element {
  return (
    <Box>
      <Header />

      <Flex maxW={1480} mx="auto" my="6" px="6" w="100%">
        <Sidebar />

        <Box bg="gray.800" borderRadius={8} flex="1" p={["6", "8"]}>
          <Heading fontWeight="normal" size="lg">
            Criar usuário
          </Heading>

          <Divider borderColor="gray.700" my="6" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <FormInput label="Nome Completo" name="name" />
              <FormInput label="Email" name="email" type="email" />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <FormInput label="Senha" name="password" type="password" />
              <FormInput
                label="Confirmação da Senha"
                name="password_confirmation"
                type="password"
              />
            </SimpleGrid>
          </VStack>

          <Flex justify="flex-end" mt="8">
            <HStack spacing="4">
              <NextLink href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </NextLink>
              <Button colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
