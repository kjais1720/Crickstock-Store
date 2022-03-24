import { ProductBadge } from "..";
import { getRatingsColor, calculateDiscount } from "./utilities";
import { Link } from "react-router-dom";

export function HorizontalProductCard({ product, isCartCard }) {
  const {
    _id,
    imgSrc,
    name,
    brand,
    badgeText,
    categoryName,
    ratings,
    price,
    prevPrice,
    addedToCart,
    addedToWishlist,
  } = product;

  return (
    <article className="pdt-card tr-card tr-card-hor d-flex">
      {badgeText ? <ProductBadge badgeText={badgeText} /> : ""}
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
      <div className="flex-col justify-c-start p-rel">
        <button className="heart-icon tr-btn tr-btn-icon">
          <i
            className={`fas fa-heart ${addedToWishlist ? "icon-filled" : ""}`}
          ></i>
        </button>
        <div className="tr-card-header">
          <Link to="/product-info/productId" className="title txt-semibold">
            {name}
          </Link>
          <h3 className="subtitle">{brand}</h3>
        </div>
        <div className="d-flex align-i-center gap-xs">
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
                  cursor: product.quantity >= 3 ? "not-allowed" : "pointer",
                }}
                disabled={product.quantity >= 3}
                className="align-s-center txt-primary fas fa-plus"
              ></button>
              <div className="pd-x-sm">{product.quantity}</div>
              <button
                style={{ border: "none" }}
                className="align-s-center txt-primary fas fa-minus"
                disabled={product.quantity <= 0}
              ></button>
            </div>
          </div>
        )}
        <div className="tr-card-footer-links flex-col gap-sm">
          <button className="tr-btn tr-btn-secondary">
            <i className="fas fa-cart-arrow-down"></i>
            {isCartCard ? "Remove from cart" : "Add to Cart"}
          </button>
          <button className="tr-btn tr-btn-primary">
            {isCartCard ? "Move to Wishlist" : "Buy Now"}
          </button>
        </div>
      </div>
    </article>
  );
}
