/**
 * 
 * @param {object} state : The Products state
 * @param {object} action : Containes the type of action and payload
 * @returns {object} Modified state
 */
export const productsReducer = (state,{type,payload}) => {
    const {productsList} = state
    switch (type) {
        case "addtoWishlist":
            return {...state,productsList:productsList.map(product=> product.id === payload ? ({...product,addedToWishList: true}) : product )};
        case "removeFromWishlist":
            return {...state,productsList:productsList.map(product=> product.id === payload ? ({...product,addedToWishList: false}) : product )};
        case "decreaseAvailability":
            return {...state, productsList:productsList.map(product=> product.id === payload.id ? {...product,available: product.available - payload.decreaseBy } : product)}
        case "increaseAvailability":
            return {...state, productsList:productsList.map(product=> product.id === payload.id ? {...product,available: product.available + payload.increaseBy } : product)}        
        case "addToCart":
            return {...state,productsList:productsList.map(product=> product.id === payload.id ? ({...product,addedToCart: true, available: product.available - payload.quantity }) : product )};
        case "removeFromCart":
            return {...state,productsList:productsList.map(product=> product.id === payload.id ? ({...product,addedToCart: false, available: product.available + payload.quantity }) : product )};
        case "updateProductsList":
            return {...state,productsList:[...payload]}
        default: 
            return state;
        
    }
}