import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { FormInput, Header, Sidebar } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/apiClient";
import { queryClient } from "@services/queryClient";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { useMutation } from "react-query";
import { withSSRAuth } from "src/utils/withSSRAuth";
import * as yup from "yup";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup.string().oneOf([null, yup.ref("password")])
});

export default function UserCreate(): JSX.Element {
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          created_at: new Date()
        }
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      }
    }
  );

  const {
    control,
    formState,
    handleSubmit,
    register
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = useFormState({ control });
  const router = useRouter();

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push("/users");
  };

  return (
    <>
      <Head>
        <title>Users — dashgo</title>
      </Head>
      <Box>
        <Header />

        <Flex maxW={1480} mx="auto" my="6" px="6" w="100%">
          <Sidebar />

          <Box
            as="form"
            bg="gray.800"
            borderRadius={8}
            flex="1"
            onSubmit={handleSubmit(handleCreateUser)}
            p={["6", "8"]}
          >
            <Heading fontWeight="normal" size="lg">
              Criar usuário
            </Heading>

            <Divider borderColor="gray.700" my="6" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <FormInput
                  error={errors.name}
                  label="Nome Completo"
                  name="name"
                  {...register("name")}
                />
                <FormInput
                  error={errors.email}
                  label="Email"
                  name="email"
                  type="email"
                  {...register("email")}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <FormInput
                  error={errors.password}
                  label="Senha"
                  name="password"
                  type="password"
                  {...register("password")}
                />
                <FormInput
                  error={errors.password_confirmation}
                  label="Confirmação da Senha"
                  name="password_confirmation"
                  type="password"
                  {...register("password_confirmation")}
                />
              </SimpleGrid>
            </VStack>

            <Flex justify="flex-end" mt="8">
              <HStack spacing="4">
                <NextLink href="/users" passHref>
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                </NextLink>
                <Button
                  colorScheme="pink"
                  isLoading={formState.isSubmitting}
                  type="submit"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {}
    };
  },
  {
    permissions: ["metrics.lists"],
    roles: ["administrator"]
  }
);
