import { Link } from "react-router-dom"
/**
 * @param {number} ratings
 * @returns {string} "red" if ratings is less than 3, "orange" if its b/w 3 & 4, "green" beyond that
 */
export const getRatingsColor = (ratings) => {
  if (Number(ratings) >= 4) return "green";
  else if (Number(ratings) >= 3 && Number(ratings) < 4) return "orange";
  return "red";
};

/**
 * @param {Number} price : Current price
 * @param {Number} prevPrice : Original Price
 * @returns {Number} Discount percentage
 */
export const calculateDiscount = (price, prevPrice) =>
  Math.ceil(((prevPrice - price) / prevPrice) * 100);

/**
 *
 * @param {Boolean} isAddedToCart : Specifies if the current product is added to cart
 * @param {string} productId : The Product ID of the current Product
 * @param {function} addToCart : Function to add the current Product into Cart
 * @returns A JSX component : "Go to Cart" link if product is added to cart and "Add to cart" button if its not added to cart or if the product card is in wishlist page, it'll always give "Add to cart" Button
 */
export function CartButton({isAddedToCart, clickHandler, isWishlistCard}) {
  return isAddedToCart && !isWishlistCard ? (
    <Link className="tr-btn tr-btn-primary txt-center" to="/cart">
      Go to Cart
    </Link>
  ) : (
    <button onClick={clickHandler} className="tr-btn tr-btn-primary">
      <i className="fas fa-cart-arrow-down"></i>
      Add to cart
    </button>
  );
}

export function ToastContent({toastMessage}){
  return(
    <div className={`d-flex f-wrap gap-sm`}>
    <p className="txt-primary">{toastMessage}</p>
    <Link to="/auth" className="txt-accent">
      Login
    </Link>
  </div>
  )
}