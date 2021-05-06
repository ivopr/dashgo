import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { FormInput } from "@components";
import { useAuth } from "@contexts/Authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { withSSRGuest } from "src/utils/withSSRGuest";
import * as yup from "yup";

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
});

export default function SignIn(): JSX.Element {
  const {
    control,
    formState,
    handleSubmit,
    register
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  });
  const { errors } = useFormState({ control });
  const { signIn } = useAuth();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn({ email: values.email, password: values.password });
  };

  return (
    <>
      <Head>
        <title>login — dashgo</title>
      </Head>
      <Flex align="center" h="100vh" justify="center" w="100vw">
        <Flex
          as="form"
          bg="gray.800"
          borderRadius={8}
          flexDir="column"
          maxW={360}
          onSubmit={handleSubmit(handleSignIn)}
          p={8}
          w="100%"
        >
          <Heading mb={4}>Sign In</Heading>
          <Stack spacing={4}>
            <FormInput
              error={errors.email}
              label="Email"
              name="email"
              type="email"
              {...register("email")}
            />
            <FormInput
              error={errors.password}
              label="Password"
              name="password"
              type="password"
              {...register("password")}
            />
          </Stack>

          <Button
            colorScheme="pink"
            isLoading={formState.isSubmitting}
            mt={6}
            size="lg"
            type="submit"
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  };
});
