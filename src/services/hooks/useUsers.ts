import { api } from "@services/api";
import { useQuery, UseQueryResult } from "react-query";

export function useUsers(): UseQueryResult<any, unknown> {
  return useQuery(
    "users",
    async () => {
      const { data } = await api.get("/users");

      const users = data.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      }));

      return users;
    },
    {
      staleTime: 5 * 1000
    }
  );
}
