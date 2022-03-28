import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "contexts";

export function AuthMiddleware() {
  const {
    userState: { isUserAuthenticated },
  } = useAuth();

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}
