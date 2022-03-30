import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function AuthMiddleware() {
  const {
    userState: { isUserAuthenticated },
  } = useAuth();

  useEffect(()=>{
    if(!isUserAuthenticated) {
      toast.error("You need to login first!")
    }
  },[])

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}
