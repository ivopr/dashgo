import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputProps {
  label?: string;
  name: string;
  error?: FieldError;
}

const FormInputBase: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { name, error = null, label, ...rest },
  ref
): JSX.Element => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        _hover={{
          bgColor: "gray.900"
        }}
        bgColor="gray.900"
        focusBorderColor="pink.500"
        name={name}
        id={name}
        ref={ref}
        size="lg"
        variant="filled"
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const FormInput = forwardRef(FormInputBase);
