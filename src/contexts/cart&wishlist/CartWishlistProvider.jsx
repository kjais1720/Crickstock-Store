import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "contexts";
import { useAxios, cartWishlistDispatchConstants, localStorageConstants } from "utilities";
import axios from "axios";
import { cartWishlistReducer } from "./reducer";
import { findCartEstimate } from "./utilities";

const {
  USER_TOKEN,
} = localStorageConstants

const { CLEAR_TOAST_MESSAGE } = cartWishlistDispatchConstants;

const cartWishlistContext = createContext({
  cartItems: [],
  wishlistItems:[],
});

const getData = (apiRoute) => {
  const authToken = localStorage.getItem(USER_TOKEN);
  return axios.get(apiRoute,{
    headers:{
      authorization: authToken
    }
  })
}
export const useCartWishlist = () => useContext(cartWishlistContext);

export const CartWishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setwishlistItems ] = useState([]);
  const {
    userState: { isUserAuthenticated },
  } = useAuth();

  const [cartWishlistState, cartWishlistDispatch] = useReducer(cartWishlistReducer, {
    apiUrl: "",
    apiMethod: "get",
    postData: {
      product: {},
    },
    toastMessage:"",
    toastType:"success"
  });
  const { serverResponse, isLoading, serverError } = useAxios(
    cartWishlistState.apiUrl,
    cartWishlistState.apiMethod,
    cartWishlistState.postData
    );
  useEffect(() => {
    // To update the cart and wishlist state everytime the app gets new data from the server
    if(serverResponse.data?.cart){
      const cart = serverResponse.data?.cart || [];
      setCartItems(cart);
    } else if (serverResponse.data?.wishlist){
      const wishlist = serverResponse.data.wishlist;
      setwishlistItems(wishlist);
    }
  }, [serverResponse]);

  useEffect(() => {
    if (!isUserAuthenticated) {
      cartWishlistDispatch({ type: CLEAR_TOAST_MESSAGE })
      setCartItems([]);
      setwishlistItems([]);
    }
    else {
      Promise.all([
        getData("/api/user/cart"),
        getData("/api/user/wishlist"),
      ])
        .then((values) => {
          const [cartResponse , wishlistResponse] = values;
          const {data:{cart}} = cartResponse
          const {data:{wishlist}} = wishlistResponse   
          setCartItems(cart);
          setwishlistItems(wishlist);
        })
        .catch((err) => console.log(err));
    }
  }, [isUserAuthenticated]);

  useEffect(()=>{
    if(serverError.response?.status===500){
      toast.error("An Error occured, please retry.")
      cartWishlistDispatch({type:CLEAR_TOAST_MESSAGE})
    }
    else if(cartWishlistState.toastMessage && !isLoading){
      toast[cartWishlistState.toastType](cartWishlistState.toastMessage);
      cartWishlistDispatch({type:CLEAR_TOAST_MESSAGE})
    }
  },[isLoading, cartWishlistState.toastMessage, serverError])
  const cartTotalEstimate = findCartEstimate(cartItems);

  return (
    <cartWishlistContext.Provider
      value={{
        cartItems,
        wishlistItems,
        cartTotalEstimate,
        cartWishlistDispatch,
        isLoading,
      }}
    >
      {" "}
      {children}
    </cartWishlistContext.Provider>
  );
};
