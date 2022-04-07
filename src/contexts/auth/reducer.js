/**
 * 
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties  
 * @returns {object} state : modified state
 */
 export const authReducer = (state, {type,payload}) => {
    switch (type){
        case "login":
            return {...state, isUserAuthenticated:true, user : {...payload}}
        case "logout":
            localStorage.removeItem("user")
            localStorage.removeItem("userToken")
            return {...state, isUserAuthenticated:false, user : {}}
        default:
            return state;
    }
}