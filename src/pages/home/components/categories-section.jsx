import { Link } from "react-router-dom";
import { useAxios } from "utilities";
import { LoaderForComponent } from "components";

export function Categories({ styles }){
  const { serverResponse, isLoading } = useAxios("/api/categories");
  const categories = serverResponse.data?.categories || [];
  return (
    <section id="categories">
      <h2 className="txt-center mr-y-lg">Categories</h2>
      {isLoading ? (
        <LoaderForComponent />
      ) : (
        <div className="d-grid grid-autofit-sm gap-sm justify-i-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.categoryName}`}
              className={`${styles.categoriesCard} tr-card light-shadow`}
            >
              <div className="tr-card-banner">
                <img src={category.imgSrc} alt={category.categoryName} />
                <div
                  className={`${styles.categoriesTextOverlay} text-overlay flex-center`}
                >
                  <h2>{category.categoryName}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
