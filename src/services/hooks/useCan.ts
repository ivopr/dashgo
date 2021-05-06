import { useAuth } from "@contexts/Authentication";
import { validateUserPermissions } from "src/utils/validateUserPermissions";

interface UseCanProps {
  permissions?: string[];
  roles?: string[];
}
export function useCan({ permissions, roles }: UseCanProps): boolean {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  });

  return userHasValidPermissions;
}
