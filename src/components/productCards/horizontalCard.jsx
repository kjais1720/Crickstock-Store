import { useState } from "react";
import { ProductBadge, Snackbar } from "components";
import {
  getRatingsColor,
  calculateDiscount,
  getCartButton,
  CartButton,
} from "./utilities";
import { useAuth, useCartWishlist } from "contexts";
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
  const [snackbarProps, setSnackbarProps] = useState({
    showSnackbar: false,
    snackbarText: "",
    actionBtn: {
      linkPath: "",
      btnType: "",
      btnText: "",
      clickHandler: null,
    },
  });
  const setShowSnackbar = (bool) => {
    setSnackbarProps((prev) => ({ ...prev, showSnackbar: bool }));
  };
  const { showSnackbar, snackbarText, actionBtn } = snackbarProps;

  const itemInCart = cartItems.find((item) => item._id === id);
  const itemInWishlist = wishlistItems.find((item) => item._id === id);
  const addedToCart = itemInCart ? true : false;
  const addedToWishlist = itemInWishlist ? true : false;

  const cartClickHandler = () => {
    if (isUserAuthenticated) {
      cartWishlistDispatch({ type: "addItemToCart", payload: product });
    } else
      setSnackbarProps((prev) => ({
        ...prev,
        showSnackbar: true,
        snackbarText: "Please Login to add the item to cart!",
        actionBtn: {
          linkPath: "/auth",
          btnType: "link",
          btnText: "Login",
        },
      }));
  };

  const wishlistClickHandler = () => {
    if (isUserAuthenticated) {
      if (itemInWishlist) {
        cartWishlistDispatch({ type: "removeFromWishlist", payload: product._id });
      } else{
        cartWishlistDispatch({ type: "addToWishlist", payload: product });
      }
    } else
      setSnackbarProps((prev) => ({
        ...prev,
        showSnackbar: true,
        snackbarText: "Please Login to add the item to cart!",
        actionBtn: {
          linkPath: "/auth",
          btnType: "link",
          btnText: "Login",
        },
      }));
  };
  const quantityBtnClickHandler = (product, action) => {
    switch (action) {
      case "increment":
        cartWishlistDispatch({
          type: "changeItemQuantity",
          payload: { id, action: "increment" },
        });
        break;
      case "decrement":
        if (product.qty > 1) {
          cartWishlistDispatch({
            type: "changeItemQuantity",
            payload: { id, action: "decrement" },
          });
        } else {
          cartWishlistDispatch({
            type: "removeFromCart",
            payload: product._id,
          });
        }
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
          onClick={wishlistClickHandler}
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
          <div className="tr-ratings-badge txt-left ratings-sm tr-ratings-badge-green">
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
                onClick={() => quantityBtnClickHandler(product, "increment")}
              ></button>
              <div className="pd-x-sm">{itemInCart.qty}</div>
              <button
                style={{ border: "none" }}
                className="align-s-center txt-primary fas fa-minus"
                onClick={() => quantityBtnClickHandler(product, "decrement")}
              ></button>
            </div>
          </div>
        )}
        <div className="tr-card-footer-links flex-col gap-sm">
          {isCartCard ? (
            <button
              onClick={() =>
                cartWishlistDispatch({
                  type: "removeFromCart",
                  payload: id,
                })
              }
              className="tr-btn tr-btn-secondary"
            >
              <i className="fas fa-cart-arrow-down"></i>
              Remove from cart
            </button>
          ) : (
            <CartButton
              isAddedToCart={addedToCart}
              clickHandler={cartClickHandler}
              isWishlistCard={false}
            />
          )}
          <button className="tr-btn tr-btn-primary">Buy Now</button>
        </div>
      </div>
      {showSnackbar ? (
        <Snackbar
          snackbarText={snackbarText}
          actionBtn={actionBtn}
          setShowSnackbar={setShowSnackbar}
          duration={5}
        />
      ) : (
        " "
      )}
    </article>
  );
}
