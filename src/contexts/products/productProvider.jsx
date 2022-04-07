import { createContext, useContext, useReducer, useEffect } from "react";
import { useAxios, productsDispatchConstants } from "utilities";
import { productsReducer } from "./reducer";
import { applyFilterAndSorts } from "./utilities";

const productsContext = createContext({ productsList: [] });

export const useProduct = () => useContext(productsContext);

export const ProductProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(productsReducer, {
    productsList: [],
    runFilterFunction: false,
    sortBy: "",
    includeOutOfStock: false,
    brands: [],
    category: "",
    ratings: 1,
    priceLimit: Infinity,
  });

  const { UPDATE_PRODUCTS_LIST } = productsDispatchConstants;

  // The filters won't be applied initially, it will only be applied when the user selects any fiilter
  const filteredProducts = productsState.runFilterFunction
    ? applyFilterAndSorts(productsState)
    : productsState.productsList;
  const { serverResponse, isLoading } = useAxios("/api/products");
  useEffect(() => {
    const productsFromServer = serverResponse.data?.products || [];
    productsDispatch({
      type: UPDATE_PRODUCTS_LIST,
      payload: [...productsFromServer],
    });
  }, [serverResponse]);

  return (
    <productsContext.Provider
      value={{
        productsList: productsState.productsList,
        productsState,
        productsDispatch,
        isLoading,
        filteredProducts,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
