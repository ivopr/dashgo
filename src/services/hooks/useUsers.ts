import { api } from "@services/apiClient";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page
    }
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }));

  return { users, totalCount };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<GetUsersResponse, unknown>
): UseQueryResult<GetUsersResponse, unknown> {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    ...options
  });
}
