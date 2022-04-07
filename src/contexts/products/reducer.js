import {
  productsDispatchConstants,
} from "utilities";
import { findMaxRoundedPrice } from "./utilities";

const { UPDATE_PRODUCTS_LIST, SET_CATEGORY, SET_FILTERS_AND_SORTS } =
  productsDispatchConstants;

export const productsReducer = (state, { type, payload }) => {
  const defaultPriceLimit = findMaxRoundedPrice(state.productsList);
  switch (type) {
    case UPDATE_PRODUCTS_LIST:
      return {
        ...state,
        productsList: [...payload],
        priceLimit: findMaxRoundedPrice(payload),
      };
    case SET_FILTERS_AND_SORTS:
      return {
        ...state,
        runFilterFunction: true,
        [payload.name]: payload.value,
      };
    case SET_CATEGORY:
      if (state.category === payload) return state; // Do not perform any state updation if the new category is the same as the current one
      return {
        // Reset all the filters if a new category is selected ( a new category page )
        ...state,
        category: payload,
        runFilterFunction: false,
        sortBy: "",
        includeOutOfStock: false,
        brands: [],
        ratings: 1,
        priceLimit: defaultPriceLimit,
      };
    case "resetFilter":
      return {
        ...state,
        category: "all",
        runFilterFunction: false,
        sortBy: "",
        includeOutOfStock: false,
        brands: [],
        ratings: 1,
        priceLimit: defaultPriceLimit,
      };
    default:
      return state;
  }
};
