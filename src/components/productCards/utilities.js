/**
 * @param {number} ratings 
 * @returns {string} "red" if ratings is less than 3, "orange" if its b/w 3 & 4, "green" beyond that
 */
export const getRatingsColor = ratings => {
    if(Number(ratings) >= 4) return "green"
    else if (Number(ratings) >=3 && Number(ratings) < 4) return "orange"
    else return "red";
}

/**
 * @param {Number} price : Current price
 * @param {Number} prevPrice : Original Price
 * @returns {Number} Discount percentage
 */
export const calculateDiscount = (price, prevPrice) => Math.ceil(((prevPrice - price) / prevPrice) * 100);

/**
 * 
 * @param {Boolean} isAddedToCart : Specifies if the current product is added to cart
 * @param {string} productId : The Product ID of the current Product
 * @returns A JSX component : "Go to Cart" link if product is added to cart and "Add to cart" button if its not added to cart
 */
export function CartButton({isAddedToCart, productId, addToCart}){
    return (isAddedToCart 
    ? <Link className="tr-btn tr-btn-secondary txt-center" to="/cart">
        Go to Cart 
      </Link>
    : <button className="tr-btn tr-btn-secondary">
        <i className="fas fa-cart-arrow-down"></i>
        Add to cart
      </button>
    )
}
