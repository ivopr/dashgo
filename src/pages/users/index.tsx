import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Header, Pagination, Sidebar } from "@components";
import Head from "next/head";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

const data = [
  {
    name: "Ivo Vieira",
    email: "ivoprovensi1@gmail.com",
    createdAt: "04 de Abril de 2021"
  },
  {
    name: "Murilo Fiuza",
    email: "muriloacademix@gmail.com",
    createdAt: "05 de Abril de 2021"
  },
  {
    name: "Thiago Fonseca",
    email: "thiago.coucello@gmail.com",
    createdAt: "06 de Abril de 2021"
  }
];

export default function UserList(): JSX.Element {
  return (
    <>
      <Head>
        <title>Users — dashgo</title>
      </Head>
      <Box>
        <Header />

        <Flex maxW={1480} mx="auto" my="6" px="6" w="100%">
          <Sidebar />

          <Box bg="gray.800" borderRadius={8} flex="1" overflowX="auto" p="8">
            <Flex align="center" justify="space-between" mb="8">
              <Heading fontWeight="normal" size="lg">
                Usuários
              </Heading>

              <NextLink href="/users/create" passHref>
                <Button
                  textAlign="center"
                  as="a"
                  colorScheme="pink"
                  fontSize="small"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  size="sm"
                >
                  Criar novo
                </Button>
              </NextLink>
            </Flex>

            <Box overflowX="auto">
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th color="gray.300" px={["4", "4", "6"]} w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    <Th>Data de Cadastro</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user) => (
                    <Tr key={user.name}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td px={["4", "4", "6"]}>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text color="gray.300" fontSize="small">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td>{user.createdAt}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Pagination />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
