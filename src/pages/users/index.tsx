import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
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
import { api } from "@services/api";
import { useUsers } from "@services/hooks/useUsers";
import { queryClient } from "@services/queryClient";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";

export default function UserList(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, error } = useUsers(page);

  async function handlePrefetchUser(id: string) {
    await queryClient.prefetchQuery(
      ["user", id],
      async () => {
        const response = await api.get(`/users/${id}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10
      }
    );
  }
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
                      {data.users.map((user) => (
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>

                          <Td px={["4", "4", "6"]}>
                            <Box>
                              {" "}
                              <ChakraLink
                                _hover={{
                                  color: "purple.500"
                                }}
                                color="purple.400"
                                onMouseEnter={() => handlePrefetchUser(user.id)}
                              >
                                <Text fontWeight="bold">{user.name}</Text>
                              </ChakraLink>
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

                <Pagination
                  currentPage={page}
                  onPageChange={setPage}
                  totalRegisterCount={data.totalCount}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
