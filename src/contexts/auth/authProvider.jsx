import { useContext, createContext, useReducer, useState, useEffect } from "react";
import { authReducer } from "./reducer";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAxios } from "utilities";

const AuthContext = createContext({ isUserAuthenticated: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, {
    isUserAuthenticated: false,
    user: {
      cart: [],
      wishlist: [],
      addresses: [],
    },
    encodedToken: "",
  });
  const [authApiState, setAuthApiState] = useState({
    url: "",
    data: "",
  });

  const navigate = useNavigate();

  const { serverResponse, isLoading, serverError } = useAxios(
    authApiState.url,
    "post",
    authApiState.data
  );
  useEffect(() => {
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      const user = serverResponse.data.user;
      userDispatch({
        type: "login",
        payload: {
          user,
          encodedToken: serverResponse.data.encodedToken,
        },
      });

      // Fire toast
      serverResponse.status === 200
        ? toast.success(`Logged in. Welcome back ${user.firstName}`)
        : toast.success(`Signed up. Welcome aboard ${user.firstName}`);
      navigate(-1);
    }
  }, [serverResponse, serverError]);

  const loginSignupHandler = (route, data) => {
    const requiredPostData = {
      email: data.email,
      password: data.password,
    };
    if (route === "/api/auth/signup") {
      requiredPostData.firstName = data.firstName;
      requiredPostData.lastName = data.lastName;
    }
    setAuthApiState({
      url: route,
      data: requiredPostData,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        userState,
        userDispatch,
        serverResponse,
        serverError,
        loginSignupHandler,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
