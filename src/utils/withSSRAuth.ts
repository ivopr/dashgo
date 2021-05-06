import { AuthTokenError } from "@services/errors/AuthTokenError";
import jwtDecode from "jwt-decode";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next";
import { destroyCookie, parseCookies } from "nookies";

import { validateUserPermissions } from "./validateUserPermissions";

interface WithSSRAuthOptions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["dashgo.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }

    if (options) {
      const user = jwtDecode<{ permissions: string[]; roles: string[] }>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false
          }
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "dashgo.token");
        destroyCookie(ctx, "dashgo.refreshToken");

        return {
          redirect: {
            destination: "/",
            permanent: false
          }
        };
      }
    }
  };
}
