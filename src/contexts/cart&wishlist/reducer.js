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
        postData: { product: {} },
      };
    case "addItemToCart":
      return {
        ...state,
        apiUrl: `/api/user/cart`,
        apiMethod: "post",
        postData: { product: { ...payload, qty: 1 } },
      };
    case "deleteItemFromCart":
      return {
        ...state,
        apiUrl: `/api/user/cart/${payload}`,
        apiMethod: "delete",
      };
    case "changeItemQuantity":
      return {
        ...state,
        apiUrl: `/api/user/cart/${payload.id}`,
        apiMethod: "post",
        postData: {
          action: { type: payload.action },
        },
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
        postData: { product: {} },
      };
    case "addToWishlist":
      return {
        ...state,
        apiUrl: `/api/user/wishlist/`,
        apiMethod: "post",
        postData: {
          product: payload,
        },
      };
    case "removeFromWishlist":
      return {
        ...state,
        apiUrl: `/api/user/wishlist/${payload}`,
        apiMethod: "delete",
        postData: {
          product: {},
        },
      };
    default:
      return state;
  }
};
