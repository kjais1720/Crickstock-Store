import { toast } from "react-toastify";
import { ProductBadge } from "components";
import { getRatingsColor, calculateDiscount, CartButton, ToastContent } from "./utilities";
import { useAuth, useCartWishlist } from "contexts";
import { cartWishlistDispatchConstants } from "utilities";
const {
  ADD_ITEM_TO_CART,
  CHANGE_ITEM_QUANTITY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} = cartWishlistDispatchConstants;


export const VerticalProductCard = ({ product, isWishlistCard }) => {
  const { cartItems, wishlistItems, cartWishlistDispatch, isLoading } =
    useCartWishlist();
  const {
    userState: { isUserAuthenticated },
  } = useAuth();

  const {
    _id: id,
    imgSrc,
    name,
    brand,
    badgeText,
    inStock,
    categoryName,
    ratings,
    price,
    prevPrice,
  } = product;
  const itemInCart = cartItems.find((item) => item._id === id);
  const itemInWishlist = wishlistItems.find((item) => item._id === id);
  const addedToCart = itemInCart ? true : false;
  const isAddedToWishlist = itemInWishlist ? true : false;

  const addToCart = () => {
    if (isUserAuthenticated) {
      if (addedToCart && isWishlistCard) {
        // Increase the item quantity if its already added to cart and is a wishlist card
        cartWishlistDispatch({
          type: CHANGE_ITEM_QUANTITY,
          payload: { product : itemInCart, action: "increment" },
        });
      } else {
        cartWishlistDispatch({ type: ADD_ITEM_TO_CART, payload: product });
      }
    }
    else{
      toast.error(<ToastContent toastMessage={"You need to login first!"}/>)
    }
  };

  const addToWishlist = (isAddedToWishlist, product) => {
    if (isUserAuthenticated) {
      if (isAddedToWishlist) {
        cartWishlistDispatch({
          type: REMOVE_FROM_WISHLIST,
          payload: product,
        });
      } else {
        cartWishlistDispatch({ type: ADD_TO_WISHLIST, payload: product });
      }
    } 
    else{
      toast.error(<ToastContent toastMessage={"You need to login first!"}/>)
    }
  };

  return (
    <article className="pdt-card tr-card flex-col gap-sm">
      {badgeText ? <ProductBadge badgeText={badgeText} /> : ""}
      <button
        className="heart-icon tr-btn tr-btn-icon"
        onClick={() => addToWishlist(isAddedToWishlist, product)}
      >
        <i className={`fas fa-heart ${isAddedToWishlist && "icon-filled"}`}></i>
      </button>
      <div className="tr-card-banner">
        <img
          src={imgSrc}
          onError={({ currentTarget }) => {
            // Fallback image if the image link breaks in future
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `/assets/${categoryName}-Category.webp`;
          }}
          alt={name}
        />
      </div>
      <div className="tr-card-header">
        <h4 className="title txt-semibold">
          {name}
        </h4>
        <h3 className="subtitle txt-gray">{brand}</h3>
      </div>
      <div className="d-flex align-i-center">
        <div
          className={`tr-ratings-badge txt-left ratings-sm tr-ratings-badge-${getRatingsColor(
            ratings
          )}`}
        >
          <i className="fas fa-star"></i>
          <span>{ratings}</span>
        </div>
      </div>
      <div className="d-flex gap-sm">
        <div className="pdt-price">
          <span className="txt-primary txt-semibold">₹{price}</span>
          <span className="prev-price txt-semibold">₹{prevPrice}</span>
        </div>
        <div className="txt-semibold txt-success align-s-center">
          {calculateDiscount(price, prevPrice)}% off
        </div>
      </div>
      {inStock ?
        <div className="tr-card-footer-links flex-col gap-sm">
          <CartButton
            isAddedToCart={addedToCart}
            clickHandler={addToCart}
            isWishlistCard={isWishlistCard}
          />
        </div>
        : 
        <div className="tr-card-footer-links flex-col gap-sm">
            <button className="tr-btn tr-btn-error no-cursor">
              Out of Stock
            </button> 
        </div>
      }
    </article>
  );
};
