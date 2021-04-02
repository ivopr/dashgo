import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface FormInputProps extends InputProps {
  label?: string;
  name: string;
}

export function FormInput({ name, label, ...rest }: FormInputProps): JSX.Element {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        _hover={{
          bgColor: "gray.900"
        }}
        bgColor="gray.900"
        focusBorderColor="pink.500"
        name={name}
        id={name}
        size="lg"
        variant="filled"
        {...rest}
      />
    </FormControl>
  );
}
