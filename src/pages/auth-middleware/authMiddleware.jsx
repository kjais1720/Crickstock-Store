import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function AuthMiddleware() {
  const {
    userState: { isUserAuthenticated },
  } = useAuth();
  const location = useLocation();
  const userToken = localStorage.getItem('userToken');

  useEffect(()=>{
    if(!userToken) {
      toast.error("You need to login first!")
    }
  },[isUserAuthenticated])

  return userToken ? <Outlet /> : <Navigate to="/auth" replace state={{from:location}} />;
}
