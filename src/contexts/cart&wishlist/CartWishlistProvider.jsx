import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "contexts";
import { useAxios } from "utilities";
import { cartWishlistReducer } from "./reducer";
import { findCartEstimate } from "./utilities";

const cartWishlistContext = createContext({
  cartItems: [],
  wishlistItems:[],
  setCartItems: () => {},
});

export const useCartWishlist = () => useContext(cartWishlistContext);

export const CartWishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setwishlistItems ] = useState([]);
  const {
    userState: { isUserAuthenticated, encodedToken },
  } = useAuth();

  const [cartWishlistState, cartWishlistDispatch] = useReducer(cartWishlistReducer, {
    apiUrl: "",
    apiMethod: "get",
    postData: {
      product: {},
    },
  });
  const { serverResponse, isLoading } = useAxios(
    cartWishlistState.apiUrl,
    cartWishlistState.apiMethod,
    cartWishlistState.postData,
    encodedToken
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
    let timeoutId;
    if (!isUserAuthenticated) {
      cartWishlistDispatch({ type: "clearCart" })
      setCartItems([]);
      setwishlistItems([]);
    }
    else {
      cartWishlistDispatch({ type: "getCartList" });
      timeoutId = setTimeout(()=>{ // To get the wishlist after the cart list is fetched from the server and stored in the local state
        cartWishlistDispatch({type:"getWishlist"})
      },0)
    }
    return ()=>clearTimeout(timeoutId);
  }, [isUserAuthenticated]);

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
