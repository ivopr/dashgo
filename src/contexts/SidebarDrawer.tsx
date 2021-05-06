import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ProviderProps {
  children: ReactNode;
}

type ContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as ContextData);

export function SidebarDrawerProvider({
  children
}: ProviderProps): JSX.Element {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = (): ContextData =>
  useContext(SidebarDrawerContext);
