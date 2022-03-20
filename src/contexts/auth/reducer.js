/**
 * 
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties  
 * @returns {object} state : modified state
 */
 export const authReducer = (state, {type,payload}) => {
    console.log({payload})
    switch (type){
        case "login":
            return {...state, isUserAuthenticated:true, user : {...payload.user}, encodedToken : payload.encodedToken}
        case "logout":
            return {...state, isUserAuthenticated:false, user : {}, encodedToken:""}
        default:
            return state;
    }
}