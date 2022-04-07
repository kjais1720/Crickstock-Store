import { authDispatchConstants, localStorageConstants } from "utilities"
const {
    LOGIN,
    LOGOUT,
  } = authDispatchConstants
const {USER_TOKEN, USER_INFO } = localStorageConstants
/**
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties  
 * @returns {object} state : modified state
 */
 export const authReducer = (state, {type,payload}) => {
    switch (type){
        case LOGIN:
            return {...state, isUserAuthenticated:true, user : {...payload}}
        case LOGOUT:
            localStorage.removeItem(USER_INFO)
            localStorage.removeItem(USER_TOKEN)
            return {...state, isUserAuthenticated:false, user : {}}
        default:
            return state;
    }
}