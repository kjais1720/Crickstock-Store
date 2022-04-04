import { useProduct } from "contexts";

export function FiltersSection({
  styles,
  productsList,
  showFilter,
  filterToggler,
}) {
  const { productsState, productsDispatch } = useProduct();
  const {
    priceLimit,
    sortBy,
    brands: selectedBrands,
    includeOutOfStock,
    ratings: selectedRating,
  } = productsState;
  const allDistinctBrands = productsList.reduce(
    (acc, { brand }) => (acc.includes(brand) ? acc : [...acc, brand]),
    []
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    productsDispatch({ type: "setFiltersAndSorts", payload: { name, value } });
  };

  const brandsClickHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      productsDispatch({
        type: "setFiltersAndSorts",
        payload: { name: "brands", value: [...selectedBrands, value] },
      });
    } else {
      productsDispatch({
        type: "setFiltersAndSorts",
        payload: {
          name: "brands",
          value: selectedBrands.filter((item) => item !== value),
        },
      });
    }
  };
  return (
    <div
      onClick={filterToggler}
      className={` ${showFilter ? styles.activeFiltersWrapper : ""}`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`${styles.filters} filters tr-drawer flex-col gap-md pd-md`}
      >
        <div className="d-flex justify-c-space-between">
          <h2 className="txt-semibold">Filters</h2>
          <button
            onClick={() => productsDispatch({ type: "resetFilter" })}
            className="tr-btn tr-btn-transparent"
          >
            clear
          </button>
        </div>
        <div
          className={`${styles.filtersDrawer} tr-drawer-content flex-col gap-xlg`}
        >
          <div className="tr-card w-100">
            <h3 className="txt-semibold">Price</h3>
            <div className="tr-input-wrapper">
              <input
                className="tr-range-slider w-100"
                onChange={changeHandler}
                name="priceLimit"
                type="range"
                min="500"
                max="20000"
                value={priceLimit}
                list="tickmarks"
                step="500"
              />
              <label className="pd-xs bd2">₹{priceLimit}</label>
            </div>
          </div>

          <div className="tr-card w-100 flex-col gap-md">
            <h3 className="txt-semibold">Availability</h3>
            <div className="flex-col gap-sm">
              <div className="tr-input-wrapper">
                <label>
                  <input
                    name="includeOutOfStock"
                    onChange={(e) =>
                      productsDispatch({
                        type: "setFiltersAndSorts",
                        payload: {
                          name: "includeOutOfStock",
                          value: e.target.checked,
                        },
                      })
                    }
                    type="checkbox"
                    className="tr-input-checkbox"
                    checked={includeOutOfStock}
                  />
                  Show Out of Stock
                </label>
              </div>
            </div>
          </div>

          <div className="tr-card w-100 flex-col gap-md">
            <h3 className="txt-semibold">Brands</h3>
            <div className="flex-col gap-sm">
              {allDistinctBrands.map((brand, idx) => (
                <div key={idx} className="tr-input-wrapper">
                  <label>
                    <input
                      onChange={brandsClickHandler}
                      type="checkbox"
                      className="tr-input-checkbox"
                      checked={selectedBrands.includes(brand)}
                      value={brand}
                    />
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="tr-card w-100 flex-col gap-md">
            <h3 className="txt-semibold">Ratings</h3>
            {["5", "4", "3", "2", "1"].map((rating, idx) => (
              <div key={idx} className="tr-input-wrapper">
                <label>
                  <input
                    type="radio"
                    className="tr-input-radio"
                    name="ratings"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={changeHandler}
                  />
                  {rating === "5"
                    ? `${rating} stars`
                    : `${rating} stars & above`}
                </label>
              </div>
            ))}
          </div>
          <div className="tr-card w-100 flex-col gap-md">
            <h3 className="txt-semibold">Sort by</h3>
            <div className="tr-input-wrapper">
              <label>
                <input
                  type="radio"
                  className="tr-input-radio"
                  name="sortBy"
                  value="priceAsc"
                  onChange={changeHandler}
                  checked={sortBy === "priceAsc"}
                />
                Price - low to high
              </label>
            </div>
            <div className="tr-input-wrapper">
              <label>
                <input
                  type="radio"
                  className="tr-input-radio"
                  name="sortBy"
                  value="priceDesc"
                  onChange={changeHandler}
                  checked={sortBy === "priceDesc"}
                />
                Price - High to low
              </label>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
