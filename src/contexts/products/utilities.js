/**
 *
 * @param {array} productList : An Array of product objects, each object having a price property
 * @returns {number} Maximum rounded price 
 */
 export const findMaxRoundedPrice = (productList) => {
    let divisor = 10;
  
    const maxPrice = Math.round(
      productList.reduce(
        (acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
        0
      )
    );
  
    while (Math.floor(maxPrice / divisor) !== 0) {
      divisor *= 10;
    }
    const stepsValue = divisor / 10;
    const stepsCount = Math.floor(maxPrice / stepsValue);
    const maxRoundedPrice = stepsValue * stepsCount + stepsValue;
    return maxRoundedPrice;
  };
  
  const sortByPrice = (list, { sortBy }) => {
    let sortedList = [...list];
    sortedList.sort((a, b) => Number(a.price) - Number(b.price));
    switch (sortBy) {
      case "priceAsc":
        return sortedList;
      case "priceDesc":
        return sortedList.reverse();
      default:
        return [...list];
    }
  };
  
  const filterOutOfStock = (list, { includeOutOfStock }) =>
    includeOutOfStock ? list : [...list].filter((item) => item.inStock);
  
  const filterByPrice = (list, { priceLimit }) =>
    [...list].filter((item) => Number(item.price) <= Number(priceLimit));
  
  const filterByRatigs = (list, { ratings }) =>
    [...list].filter((item) => item.ratings >= ratings);
  
  const filterByBrands = (list, { brands }) =>
    brands[0] ? [...list].filter((item) => brands.includes(item.brand)) : list; // If no brands are selected, return the whole list
  
  const filterByCategory = (list, { category }) =>
    category ? [...list].filter((item) => item.categoryName === category) : list;
  
  const functionalChaining =
    (filterParams, ...functions) =>
    (productsList) => {
      return functions.reduce(
        (accum, curr) => curr(accum, filterParams),
        productsList
      );
    };
  
  export const applyFilterAndSorts = (state) => {
    const {
      category,
      productsList,
      sortBy,
      includeOutOfStock,
      priceLimit,
      ratings,
      brands,
    } = state;
    const composedFunctions = functionalChaining(
      { category, sortBy, includeOutOfStock, priceLimit, ratings, brands },
      sortByPrice,
      filterOutOfStock,
      filterByPrice,
      filterByRatigs,
      filterByBrands,
      filterByCategory
    );
  
    let updatedList = composedFunctions(productsList);
    return updatedList;
  };
  