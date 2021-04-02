import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SidebarDrawerProvider } from "src/contexts/SidebarDrawer";

import { theme } from "../styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}
