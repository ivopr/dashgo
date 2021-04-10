import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Header, Pagination, Sidebar } from "@components";
import { useUsers } from "@services/hooks/useUsers";
import Head from "next/head";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export default function UserList(): JSX.Element {
  const { data, isFetching, isLoading, error } = useUsers();

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
                {!isLoading && isFetching && (
                  <Spinner color="gray.500" ml="4" size="sm" />
                )}
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
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados</Text>
              </Flex>
            ) : (
              <>
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
                      {data.map((user: User) => (
                        <Tr key={user.id}>
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
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
