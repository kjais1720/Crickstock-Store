import { useCartWishlist } from "contexts";
import { VerticalProductCard } from "components";
import { EmptyPageMessage } from "pages";

export function Wishlist(){
    document.title = "Wishlist | Crickstock"
  const { wishlistItems } = useCartWishlist();

  return(
    <main className="pd-x-lg mr-y-xlg">
        {
            wishlistItems[0]
            ? <>
            <h2 className="txt-center">
                My Wishlist
            </h2>
            <div id="productCardsContainer" className="wishlist-cards d-flex justify-c-center gap-xlg f-wrap mr-y-lg">
            {
                wishlistItems?.map((product) => (
                <VerticalProductCard key={product.id} product={product} isWishlistCard = {true} />
                ))
            }
            </div>
            </>
            : <EmptyPageMessage pageName={"wishlist"}/>
        }
    </main>
  )
};
