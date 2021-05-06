import { api } from "@services/apiClient";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

interface SignInCredenials {
  email: string;
  password: string;
}

interface ContextProps {
  isAuthenticated: boolean;
  signIn(credentials: SignInCredenials): Promise<void>;
  signOut(): void;
  user: UserProps;
}

interface ProviderProps {
  children: ReactNode;
}

interface UserProps {
  email: string;
  permissions: string[];
  roles: string[];
}

const AuthenticationContext = createContext({} as ContextProps);

let AuthChannel: BroadcastChannel;

export function signOut(): void {
  const { push } = useRouter();
  destroyCookie(undefined, "dashgo.token");
  destroyCookie(undefined, "dashgo.refreshToken");

  AuthChannel.postMessage("signOut");

  push("/");
}

export function AuthenticationProvider({
  children
}: ProviderProps): JSX.Element {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    AuthChannel = new BroadcastChannel("auth");

    AuthChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({
            email,
            permissions,
            roles
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredenials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password
      });

      const { permissions, roles, refreshToken, token } = response.data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      });

      setCookie(undefined, "dashgo.refreshToken", refreshToken);

      setUser({
        email,
        permissions,
        roles
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuth = (): ContextProps => useContext(AuthenticationContext);
