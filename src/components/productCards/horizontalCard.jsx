import { ProductBadge } from "components";
import {
  getRatingsColor,
  calculateDiscount,
  CartButton,
  ToastContent
} from "./utilities";
import { toast } from "react-toastify";
import { useAuth, useCartWishlist } from "contexts";
import { cartWishlistDispatchConstants } from "utilities";
const {
  ADD_ITEM_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_ITEM_QUANTITY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} = cartWishlistDispatchConstants;


export function HorizontalProductCard({ product, isCartCard }) {
  const {
    _id: id,
    imgSrc,
    name,
    brand,
    badgeText,
    ratings,
    price,
    prevPrice,
  } = product;
  const {
    userState: { isUserAuthenticated },
  } = useAuth();

  const { cartItems, wishlistItems, cartWishlistDispatch, isLoading } =
    useCartWishlist();

  const itemInCart = cartItems.find((item) => item._id === id);
  const itemInWishlist = wishlistItems.find((item) => item._id === id);
  const addedToCart = itemInCart ? true : false;
  const addedToWishlist = itemInWishlist ? true : false;

  const addToCart = () => {
    if (isUserAuthenticated) {
      cartWishlistDispatch({ type: ADD_ITEM_TO_CART, payload: product });
    } 
    else{
      toast.error(<ToastContent toastMessage={"You need to login first!"}/>)
    }
  };

  const removeFromCart = () => cartWishlistDispatch({type:REMOVE_FROM_CART, payload:product})

  const addToWishlist = () => {
    if (isUserAuthenticated) {
      if (itemInWishlist) {
        cartWishlistDispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
      } else{
        cartWishlistDispatch({ type: ADD_TO_WISHLIST, payload: product });
      }
    }
    else{
      toast.error(<ToastContent toastMessage={"You need to login first!"}/>)
    }
  };
  const updateItemQuantity = (product, action) => {
    switch (action) {
      case "increment":
        cartWishlistDispatch({
          type: CHANGE_ITEM_QUANTITY,
          payload: { product, action: "increment" },
        });
        break;
      case "decrement":
        if (product.qty > 1) {
          cartWishlistDispatch({
            type: CHANGE_ITEM_QUANTITY,
            payload: { product, action: "decrement" },
          });
        } else {
          cartWishlistDispatch({
            type: REMOVE_FROM_CART,
            payload: product,
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <article className="pdt-card tr-card tr-card-hor d-flex">
      {badgeText ? <ProductBadge badgeText={badgeText} /> : ""}
      <div className="tr-card-banner">
        <img src={imgSrc} alt={name} />
      </div>
      <div className="flex-col justify-c-start p-rel">
        <button
          onClick={addToWishlist}
          className="heart-icon tr-btn tr-btn-icon"
        >
          <i className={`fas fa-heart ${addedToWishlist && "icon-filled"}`}></i>
        </button>
        <div className="tr-card-header">
          <a href="../product-info/productId" className="title txt-semibold">
            {name}
          </a>
          <h3 className="subtitle">{brand}</h3>
        </div>
        <div className="d-flex align-i-center gap-xs">
          <div className={`tr-ratings-badge txt-left ratings-sm tr-ratings-badge-${getRatingsColor(ratings)}`}>
            <i className="fas fa-star"></i>
            <span>{ratings}</span>
          </div>
        </div>
        <div className="d-flex gap-sm">
          <div className="pdt-price">
            <span className="curr-price txt-semibold">₹{price}</span>
            <span className="prev-price txt-semibold">₹{prevPrice}</span>
          </div>
          <div className="txt-semibold txt-success align-s-center">
            {calculateDiscount(price, prevPrice)}% off
          </div>
        </div>
        {isCartCard && ( // Show the quantity component only if its a cart card
          <div className="d-flex gap-md align-i-center">
            <p>Quantity: </p>
            <div className="d-flex">
              <button
                style={{
                  border: "none",
                  cursor: itemInCart.qty >= 3 ? "not-allowed" : "pointer",
                }}
                disabled={itemInCart.qty >= 3}
                className="align-s-center txt-primary fas fa-plus"
                onClick={() => updateItemQuantity(product, "increment")}
              ></button>
              <div className="pd-x-sm">{itemInCart.qty}</div>
              <button
                style={{ border: "none" }}
                className="align-s-center txt-primary fas fa-minus"
                onClick={() => updateItemQuantity(product, "decrement")}
              ></button>
            </div>
          </div>
        )}
        <div className="tr-card-footer-links flex-col gap-sm">
          {isCartCard ? (
            <button
              onClick={removeFromCart}
              className="tr-btn tr-btn-secondary"
            >
              <i className="fas fa-cart-arrow-down"></i>
              Remove from cart
            </button>
          ) : (
            <CartButton
              isAddedToCart={addedToCart}
              clickHandler={addToCart}
              isWishlistCard={false}
            />
          )}
          <button className="tr-btn tr-btn-primary">Buy Now</button>
        </div>
      </div>
    </article>
  );
}
