import { useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useAuth, useCartWishlist } from "contexts";
import { Badge, DropdownMenu } from "components/miscellaneous/miscellaneous";

export const Header = () => {
  const { cartItems, wishlistItems } = useCartWishlist();
  const {
    userState: { isUserAuthenticated, user },
  } = useAuth();
  const [showNav, setShowNav] = useState(false);
  const headerDropdownMenuList = {
    productPageLinks: [
      {
        path: "/products/Bats",
        name: "Bats",
      },
      {
        path: "/products/Balls",
        name: "Balls",
      },
      {
        path: "/products/Shoes",
        name: "Shoes",
      },
      {
        path: "/products/All Products",
        name: "All products",
      },
    ],
  };
  return (
    <div
      className={`${styles.header} tr-header ${
        showNav && "active"
      } d-flex f-wrap`}
    >
      <div className="tr-heading d-flex">
        <Link to="/" className={styles.logo}>
          <img src="/assets/crickstock-logo.png" alt="Crickstock logo" />
        </Link>
      </div>
      <button
        className={`${styles.hamburger} hamburger tr-btn tr-btn-icon hide`}
        onClick={() => setShowNav((prev) => !prev)}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div
        className={`${styles.headerMenu} d-flex justify-c-space-between f-wrap`}
      >
        {/* <div
          className={`${styles.searchInputWrapper} tr-input-wrapper d-flex gap-sm`}
        >
          <input type="text" className="tr-input-item" placeholder="Search" />
          <button className="tr-btn tr-btn-icon">
            <i className="fas fa-search"></i>
          </button>
        </div> */}
        <nav className="tr-nav d-flex gap-md">
          <DropdownMenu
            links={headerDropdownMenuList.productPageLinks}
            menuTitle={"Products"}
          />
          {isUserAuthenticated ? (
            <Link className="tr-btn tr-btn-link d-flex align-i-center gap-sm" to="/user/profile/orders">{user.firstName}</Link>
          ) : (
            <Link to="/auth" className="tr-btn tr-btn-link">
              Login
            </Link>
          )}
          <div className="badge-wrapper">
            <Link
              to="/wishlist"
              className={`${styles.trBtnIcon} tr-btn tr-btn-icon`}
            >
              <i className="fas fa-heart"></i>
            </Link>
            {wishlistItems?.length !== 0 && (
              <Badge badgeCount={wishlistItems.length} />
            )}
          </div>
          <div className="badge-wrapper">
            <Link
              to="/cart"
              className={`${styles.trBtnIcon} tr-btn tr-btn-icon`}
            >
              <i className="fas fa-shopping-cart"></i>
            </Link>
            {cartItems.length !== 0 && <Badge badgeCount={cartItems.length} />}
          </div>
        </nav>
      </div>
    </div>
  );
};
