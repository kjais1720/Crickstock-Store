import { cartWishlistDispatchConstants } from "utilities";
const {
  GET_CART_LIST,
  ADD_ITEM_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_ITEM_QUANTITY,
  CLEAR_CART,
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_TOAST_MESSAGE,
} = cartWishlistDispatchConstants;

export const cartWishlistReducer = (state, { type, payload }) => {
  const defaultState = {
    apiUrl: "",
    apiMethod: "get",
    postData: {
      product: {},
    },
  };
  switch (type) {
    case GET_CART_LIST:
      return {
        ...state,
        apiUrl: "/api/user/cart",
        apiMethod: "get",
        postData: {},
      };
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        apiUrl: `/api/user/cart`,
        apiMethod: "post",
        postData: { product: { ...payload, qty: 1 } },
        toastMessage: `${payload.name} added to cart`,
        toastType: "success",
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        apiUrl: `/api/user/cart/${payload._id}`,
        apiMethod: "delete",
        postData: {},
        toastMessage: `${payload.name} removed from cart`,
        toastType: "success",
      };
    case CHANGE_ITEM_QUANTITY:
      const {
        product: { _id, qty },
        action,
      } = payload;
      if (qty >= 3 && action === "increment")
        return {
          ...state,
          toastMessage: "Maximum quantity reached",
          toastType: "error",
        };
      return {
        ...state,
        apiUrl: `/api/user/cart/${_id}`,
        apiMethod: "post",
        postData: {
          action: { type: payload.action },
        },
        toastMessage: `Quantity ${action}ed`,
        toastType: "success",
      };
    case CLEAR_CART:
      return {
        ...state,
        apiUrl: "/api/user/cart",
        apiMethod:"delete",
        toastMessage:"",
      };
    case GET_WISHLIST:
      return {
        ...state,
        apiUrl: "/api/user/wishlist",
        apiMethod: "get",
        postData: {},
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        apiUrl: `/api/user/wishlist/`,
        apiMethod: "post",
        postData: {
          product: payload,
        },
        toastMessage: `${payload.name} added to Wishlist`,
        toastType: "success",
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        apiUrl: `/api/user/wishlist/${payload._id}`,
        apiMethod: "delete",
        postData: {
          product: {},
        },
        toastMessage: `${payload.name} removed from Wishlist`,
        toastType: "success",
      };
    case CLEAR_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: "",
      };
    default:
      return state;
  }
};
