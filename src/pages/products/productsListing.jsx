import styles from "./products.module.css";
import { FiltersSection } from "./components/filter-section";
import { ProductsSection } from "./components/products-section";
import { useProduct } from "contexts";
import { LoaderForComponent } from "components";
import { productsDispatchConstants } from "utilities";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Products() {
  document.title = "Products | Crickstock";

  const [showFilter, setShowFilter] = useState(false);
  const {
    productsState,
    productsList,
    filteredProducts,
    isLoading,
    productsDispatch,
  } = useProduct();
  const { runFilterFunction } = productsState;
  const { category } = useParams();
  
  const { SET_CATEGORY } = productsDispatchConstants;

  const productsOfSelectedCategory =
    category === "All Products"
      ? productsList
      : productsList?.filter((product) => product.categoryName === category);

  const productsToDisplay = runFilterFunction
    ? filteredProducts
    : productsOfSelectedCategory;

  useEffect(() => {
    productsDispatch({ type: SET_CATEGORY, payload: category });
  }, [category]);

  const filterToggler = () => {
    setShowFilter((prev) => !prev);
  };
  return (
    <div className="d-flex">
      <FiltersSection
        styles={styles}
        productsList={productsOfSelectedCategory}
        showFilter={showFilter}
        filterToggler={filterToggler}
      />
      <main className="flex-col pd-md">
        <div>
          <h2 className="txt-center">{category}</h2>
          <p>Showing {productsToDisplay.length} products</p>
        </div>
        <div className="d-flex justify-c-space-between">
          <button
            onClick={filterToggler}
            className={`${styles.filterBtn} filter-btn tr-btn tr-btn-primary pd-xs`}
          >
            Filter <i className="fas fa-filter"></i>
          </button>
        </div>
        {isLoading ? (
          <LoaderForComponent />
        ) : (
          <ProductsSection styles={styles} productsList={productsToDisplay} />
        )}
      </main>
    </div>
  );
}
