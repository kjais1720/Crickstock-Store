import { Link } from 'react-router-dom'
import { ProductBadge } from '..'
import { getRatingsColor, calculateDiscount, CartButton } from './utilities';

export function VerticalProductCard({ product }){
    const { 
        _id, 
        available, 
        imgSrc, 
        name, 
        brand, 
        badgeText, 
        categoryName, 
        ratings, 
        price, 
        prevPrice, 
        addedToCart, 
        addedToWishlist 
    } = product;

    return (
        <article className="pdt-card tr-card flex-col gap-sm">
            {badgeText ? <ProductBadge badgeText={badgeText} /> : ""}
            <button className="heart-icon tr-btn tr-btn-icon">
                <i className={`fas fa-heart ${addedToWishlist && 'icon-filled'}`}></i>
            </button>
            <div className="tr-card-banner">
                <img 
                    src={imgSrc}
                    onError={({ currentTarget }) => { // Fallback image if the image link breaks in future
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=`/assets/${categoryName}-Category.webp`;
                    }}
                    alt={name}
                />
            </div>
            <div className="tr-card-header">
                <Link to='../product-info/productId' className="title txt-semibold">{name}</Link>
                <h3 className="subtitle txt-gray">{brand}</h3>
            </div>
            <div className="d-flex align-i-center">
                <div className={`tr-ratings-badge txt-left ratings-sm tr-ratings-badge-${getRatingsColor(ratings)}`}>
                    <i className="fas fa-star"></i>
                    <span>{ratings}</span>
                </div>
            </div>
            <div className="d-flex gap-sm">
                <div className="pdt-price">
                    <span className="txt-primary txt-semibold">
                        ₹{price}
                    </span>
                    <span className="prev-price txt-semibold">
                        ₹{prevPrice}
                    </span>
                </div>
                <div className="txt-semibold txt-success align-s-center">{calculateDiscount(price, prevPrice)}% off</div>
            </div>
            <div>{available}</div>
            <div className="tr-card-footer-links flex-col gap-sm">
                <CartButton isAddedToCart = {addedToCart} productId = {id} /> 
                <button className="tr-btn tr-btn-primary">
                    <i className="fas fa-bags-shopping"></i>
                    Buy Now
                </button>
            </div>
        </article>
    )
}