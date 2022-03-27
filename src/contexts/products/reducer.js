import { findMaxRoundedPrice } from "./utilities";
export const productsReducer = (state, { type, payload }) => {
  const defaultPriceLimit = findMaxRoundedPrice(state.productsList);
  switch (type) {
    case "updateProductsList":
      return { ...state, productsList: [...payload], priceLimit: findMaxRoundedPrice(payload) };
    case "setFiltersAndSorts":
      return { ...state, runFilterFunction:true , [payload.name]: payload.value };
    case "setCategory":
      if(state.category === payload) return state; // Do not perform any state updation if the new category is the same as the current one
      return { // Reset all the filters if a new category is selected ( a new category page ) 
        ...state, 
        category:payload,
        runFilterFunction:false,
        sortBy: "",
        includeOutOfStock: false,
        brands:[],
        ratings:1,
        priceLimit: defaultPriceLimit
      }
    case "resetFilter":
      return {
        ...state,
        category:"all",
        runFilterFunction:false,
        sortBy: "",
        includeOutOfStock: false,
        brands:[],
        ratings:1,
        priceLimit: defaultPriceLimit
      };
    default:
      return state;
  }
};
