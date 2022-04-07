import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { authReducer } from "./reducer";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAxios } from "utilities";
import { authDispatchConstants, localStorageConstants } from "utilities"
const {
    LOGIN,
  } = authDispatchConstants

const {
  USER_TOKEN,
  USER_INFO
} = localStorageConstants

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
  });
  const [authApiState, setAuthApiState] = useState({
    url: "",
    data: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pageToRedirect = location.state?.from?.pathname || location.pathname;

  const { serverResponse, isLoading, serverError } = useAxios(
    authApiState.url,
    "post",
    authApiState.data
  );

  useEffect(() => {
    // To get the user details everytime the page reloads, from the saved token in localstorage
    const user = localStorage.getItem(USER_INFO);
    if(user){
      userDispatch({ type: LOGIN, payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      const user = serverResponse.data.user;
      const encodedToken = serverResponse.data.encodedToken;
      localStorage.setItem(USER_TOKEN, encodedToken);
      localStorage.setItem(USER_INFO, JSON.stringify(user));
      userDispatch({
        type: LOGIN,
        payload: user,
      });

      // Fire toast
      serverResponse.status === 200
        ? toast.success(`Logged in. Welcome back ${user.firstName}`)
        : toast.success(`Signed up. Welcome aboard ${user.firstName}`);
      navigate(pageToRedirect);
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
