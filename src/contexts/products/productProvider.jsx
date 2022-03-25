import { useState, createContext, useContext, useReducer, useEffect  } from "react";
import { useAxios } from 'utilities';
import { productsReducer } from "./reducer";
import { useAuth } from "contexts";

const productsContext = createContext({productsState:{productsList:[]}});

export const useProduct = () => useContext(productsContext);

export const ProductProvider = ({children}) => {
    const [apiUrl, setApiUrl ] = useState("/api/products");
    const [productsState, productsDispatch] = useReducer(productsReducer,{productsList:[]});
    const { serverResponse, isLoading, serverError } = useAxios(apiUrl);
    const {userState} = useAuth();
    const productsFromServer = serverResponse.data?.products || [];
    
    // useEffect(()=>{ // To add the 'addedToCart' and 'addedToWishlist' properties to the products state
    //     let updatedProductsList = [];
    //     const {cart, wishlist} = userState.user;
    //     if(userState.isUserAuthenticated){
    //         updatedProductsList = productsFromServer.map(
    //             product=> {
    //                 return {
    //                     ...product,
    //                     addedToCart: cart.find(item=>item.id === product.id) ? true : false ,
    //                     addedToWishlist: wishlist.find(item=> item.id === product.id ) ? true : false
    //                 };
    //             }
    //         )
    //     } else {
    //         updatedProductsList = [...productsFromServer]
    //     }
    //     productsDispatch({type:"updateProductsList",payload:updatedProductsList})
    // },[userState])  

    useEffect(()=>{
        const updatedData = serverResponse.data?.products || [];
        productsDispatch({type:"updateProductsList",payload:[...updatedData]})
    },[serverResponse])
    return (
        <productsContext.Provider value={{ productsList: productsState.productsList, productsDispatch, isLoading, serverError }}>
            {children}
        </productsContext.Provider>
    )
}
