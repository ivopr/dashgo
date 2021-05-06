import { ChakraProvider } from "@chakra-ui/react";
import { AuthenticationProvider } from "@contexts/Authentication";
import { SidebarDrawerProvider } from "@contexts/SidebarDrawer";
import { queryClient } from "@services/queryClient";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { makeServer } from "../services/mirage";
import { theme } from "../styles/theme";

{
  /**
  if (process.env.NODE_ENV === "development") {
    makeServer();
  }
  */
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthenticationProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthenticationProvider>
      </ChakraProvider>

      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
