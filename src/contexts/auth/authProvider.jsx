import { useContext, createContext, useReducer } from "react";
import { authReducer } from "./reducer";

const AuthContext = createContext({
    userState:{
        isUserAuthenticated:false, 
        user:{
            cart:[],
            wishlist:[],
            addresses:[]
        },
        encodedToken:''
    }
})

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}){
    const [userState, userDispatch] = useReducer(authReducer, {
        isUserAuthenticated:false,
        user:{
            cart:[],
            wishlist:[],
            addresses:[]
        },
        encodedToken:''
    })
    return (
        <AuthContext.Provider value={{userState, userDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}