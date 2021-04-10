import { Button, Flex, Stack } from "@chakra-ui/react";
import { FormInput } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
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

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
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
