import styles from "./products.module.css";
import { FiltersSection } from "./components/filter-section";
import { ProductsSection } from "./components/products-section";
import { useProduct } from "contexts";
import { LoaderForComponent } from "components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function Products(){
  document.title = "Products | Crickstock";

  const { productsState, productsList, filteredProducts, isLoading, productsDispatch } = useProduct();
  const {runFilterFunction} = productsState;
  const { category } = useParams();
  const productsOfSelectedCategory = category
    ? productsList?.filter((product) => product.categoryName === category)
    : productsList;

  const productsToDisplay = runFilterFunction ? filteredProducts : productsOfSelectedCategory;
  useEffect(()=>{
    productsDispatch({type:"setCategory",payload:category})
  },[category])
  return (
    <div className="d-flex">
      <FiltersSection styles={styles} productsList={productsOfSelectedCategory} />
      <main className="flex-col pd-md gap-lg">
        <div className="d-flex justify-c-space-between">
          <button className="filter-btn tr-btn tr-btn-primary pd-xs">
            Filter <i className="fas fa-filter"></i>
          </button>
        </div>
        {isLoading ? <LoaderForComponent/> : <ProductsSection styles={styles} productsList={productsToDisplay} />}

        <div className="d-flex gap-sm mr-x-auto align-i-center pagination">
          <button className="tr-btn tr-btn-icon">
            <i className="fas fa-chevron-left"></i>
          </button>
          <p className="txt-left">Showing 1 - 9 of {productsToDisplay.length} results</p>
          <button className="tr-btn tr-btn-icon">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </main>
    </div>
  );
};
