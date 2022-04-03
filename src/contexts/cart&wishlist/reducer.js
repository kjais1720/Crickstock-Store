export const cartWishlistReducer = (state, { type, payload }) => {
  const defaultState = {
    apiUrl: "",
    apiMethod: "get",
    postData: {
      product: {},
    },
  };
  switch (type) {
    case "getCartList":
      return {
        ...state,
        apiUrl: "/api/user/cart",
        apiMethod: "get",
        postData: {},
      };
    case "addItemToCart":
      return {
        ...state,
        apiUrl: `/api/user/cart`,
        apiMethod: "post",
        postData: { product: { ...payload, qty: 1 } },
        toastMessage: `${payload.name} added to cart`,
        toastType: "success",
      };
    case "removeFromCart":
      return {
        ...state,
        apiUrl: `/api/user/cart/${payload._id}`,
        apiMethod: "delete",
        postData:{},
        toastMessage: `${payload.name} removed from cart`,
        toastType: "success",
      };
    case "changeItemQuantity":
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
        toastType:"success"
      };
    case "clearCart":
      return {
        ...state,
        ...defaultState,
      };
    case "getWishlist":
      return {
        ...state,
        apiUrl: "/api/user/wishlist",
        apiMethod: "get",
        postData: { },
      };
    case "addToWishlist":
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
    case "removeFromWishlist":
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
    case "clearToastMessage":
      return {
        ...state,
        toastMessage: "",
      };
    default:
      return state;
  }
};
