const { GET_ADDRESSES, CREATE_NEW_ADDRESS, DELETE_ADDRESS, UPDATE_ADDRESS } =
  userConstants;

export const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_ADDRESSES:
      return {
        ...state,
        url: "/user/address",
        method: "get",
        data: {},
      };
    case CREATE_NEW_ADDRESS:
      return {
        ...state,
        url: "/user/address",
        method: "post",
        data: payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        url: `/user/address/${payload._id}`,
        method: "post",
        data: payload,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        url: `/user/address${payload._id}`,
        method: "delete",
        data: {},
      };
  }
};
