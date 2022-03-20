import { useProduct } from "../../../contexts";
import { HorizontalProductCard } from "../../../components";

export function NewArrivals(){
    const { productsList, isLoading } = useProduct();
    const newArrivals = productsList[0] ? productsList?.filter(item=>item.new).slice(0,4) : [null];
    return (
        <section>
            <h2 className="mr-y-lg txt-center">New Arrivals</h2>
            <div className="d-grid grid-autofit-lg justify-i-center gap-md">
                {newArrivals[0] && newArrivals.map(product=> <HorizontalProductCard key={product._id} product={product} isCartCard={false} /> )}
            </div>
        </section>
    )
}