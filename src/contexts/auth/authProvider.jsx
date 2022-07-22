import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { userReducer, userApiReducer } from "./reducer";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAxios } from "utilities";
import { userConstants, localStorageConstants } from "utilities";
const {
  LOGIN,
  GET_LOGGED_IN_USER,
  CREATE_NEW_ADDRESS,
  CREATE_NEW_ORDER,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
} = userConstants;
const { USER_TOKEN, USER_INFO } = localStorageConstants;

const defaultUser = {
  cart: [],
  wishlist: [],
  addresses: [],
  orders: [],
};
const AuthContext = createContext({ isUserAuthenticated: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState({
    isUserAuthenticated: false,
    user: defaultUser,
  });
  const [userApiState, userApiDispatch] = useReducer(userApiReducer, {
    url: "",
    method: "",
    data: {},
  });
  const navigate = useNavigate();
  const location = useLocation();
  const pageToRedirect = location.state?.from?.pathname || "/";

  const { serverResponse, isLoading, serverError } = useAxios(
    userApiState.url,
    userApiState.method,
    userApiState.data
  );

  useEffect(() => {
    // To get the user details everytime the page reloads, from the saved token in localstorage
    const user = localStorage.getItem(USER_INFO);
    if (user) {
      userApiDispatch({ type: GET_LOGGED_IN_USER });
    }
  }, []);

  useEffect(() => {
    if (serverError.response?.status) {
      toast.error("Something went wrong. Please try again!!");
    } else if (serverResponse.data?.user) {
      const user = serverResponse.data.user;
      const encodedToken = serverResponse.data.encodedToken;
      encodedToken && localStorage.setItem(USER_TOKEN, encodedToken);
      localStorage.setItem(USER_INFO, JSON.stringify(user));
      login(user);

      // Fire toast
      serverResponse.status === 200
        ? toast.success(`Logged in. Welcome back ${user.firstName}`)
        : toast.success(`Signed up. Welcome aboard ${user.firstName}`);
      navigate(pageToRedirect);
    } else if (serverResponse.data?.addresses) {
      const userAddresses = serverResponse.data.addresses;
      setUserState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          addresses: userAddresses,
        },
      }));
    } else if (serverResponse.data?.orders) {
      const userOrders = serverResponse.data.orders;
      setUserState(prev => ({
        ...prev,
        user:{
          ...prev.user,
          orders: userOrders
        }
      }))
    }
  }, [serverResponse, serverError]);

  const logout = () => {
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(USER_TOKEN);
    setUserState((prev) => ({
      ...prev,
      isUserAuthenticated: false,
      user: defaultUser,
    }));
  };
  const login = (user) =>
    setUserState((prev) => ({
      ...prev,
      isUserAuthenticated: true,
      user: { ...user },
    }));

  const loginSignupHandler = (route, data) => {
    const requiredPostData = {
      email: data.email,
      password: data.password,
    };
    if (route === "/api/auth/signup") {
      requiredPostData.firstName = data.firstName;
      requiredPostData.lastName = data.lastName;
      userApiDispatch({ type: SIGNUP, payload: requiredPostData });
      return;
    }
    userApiDispatch({ type: LOGIN, payload: requiredPostData });
  };
  const createNewAddress = (address) => {
    userApiDispatch({ type: CREATE_NEW_ADDRESS, payload: address });
  };
  const updateAddress = (address) => {
    userApiDispatch({ type: UPDATE_ADDRESS, payload: address });
  };
  const deleteAddress = (addressId) => {
    userApiDispatch({ type: DELETE_ADDRESS, payload: addressId });
  };
  const createOrder = (order) => {
    userApiDispatch({ type: CREATE_NEW_ORDER, payload: order });
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        serverResponse,
        serverError,
        isLoading,
        loginSignupHandler,
        logout,
        createNewAddress,
        updateAddress,
        deleteAddress,
        createNewAddress,
        createOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
