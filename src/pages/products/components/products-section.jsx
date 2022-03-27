import { VerticalProductCard, Loader } from "components";

export function ProductsSection({ styles, productsList }){
    return (
    <section
      className={`${styles.productsContainer} d-grid gap-sm grid-autofit-sm`}
    >
    {productsList?.map((product) => (
        <VerticalProductCard key={product.id} product={product} isCartCard = {false} />
      ))
    }
    </section>
  );
};
