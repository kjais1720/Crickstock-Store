import { userConstants, localStorageConstants } from "utilities";
const {
  LOGIN,
  LOGOUT,
  GET_LOGGED_IN_USER,
  CREATE_NEW_ADDRESS,
  CREATE_NEW_ORDER,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
} = userConstants;
const { USER_TOKEN, USER_INFO } = localStorageConstants;
/**
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties
 * @returns {object} state : modified state
 */
export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, isUserAuthenticated: true, user: { ...payload } };
    case LOGOUT:
      localStorage.removeItem(USER_INFO);
      localStorage.removeItem(USER_TOKEN);
      return { ...state, isUserAuthenticated: false, user: {} };
    default:
      return state;
  }
};

export const userApiReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        url: "/api/auth/login",
        method: "post",
        data: payload,
      };
    case GET_LOGGED_IN_USER:
      return {
        ...state,
        url: "/api/auth/user",
        method: "get",
        data: {},
      };
    case LOGOUT:
      return {
        ...state,
        url: "/api/auth/signup",
        method: "post",
        data: payload,
      };
    case CREATE_NEW_ADDRESS:
      console.log("here")
      return {
        url: "/api/user/address",
        method: "post",
        data: { address: payload },
      };
    case UPDATE_ADDRESS:
      return {
        url: `/api/user/address/${payload._id}`,
        method: "post",
        data: { updatedAddress: payload },
      };
    case DELETE_ADDRESS:
      return {
        url: `/api/user/address/${payload}`,
        method: "delete",
        data: {},
      };
    case CREATE_NEW_ORDER:
      return {
        url: "/api/user/order",
        method: "post",
        data: {
          order: payload,
        },
      };
    default:
      return state;
  }
};
