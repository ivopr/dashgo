import { signOut } from "@contexts/Authentication";
import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["dashgo.token"]}`
    }
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);
          const { "dashgo.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post("/refresh", {
                refreshToken
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "dashgo.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/"
                });

                setCookie(
                  ctx,
                  "dashgo.refreshToken",
                  response.data.refreshToken
                );

                api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.resolve(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.reject(err));
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              reject: (err: AxiosError) => {
                reject(err);
              }
            });
          });
        } else {
          if (process.browser) {
            signOut();
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
