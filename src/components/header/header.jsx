import styles from './header.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from '../miscellaneous/miscellaneous';

export const Header = ({ userIsLoggedIn })=>{
    const [ showPageMenu, setShowPageMenu ] = useState(false);
    const cartItems = []; // will be replaced by cart context later
    const wishlistItems = []; // will be replaced by wishlist context later

    return(
        <div className={`${styles.header} tr-header d-flex f-wrap`}>
            <div className="tr-heading d-flex">
                <Link to='/' className={styles.logo}>
                    <img src='/assets/crickstock-logo.png' alt = "Crickstock logo" />
                </Link>
            </div>
            <div className={`${styles.headerMenu} d-flex justify-c-space-between`}>
                <div className="tr-input-wrapper d-flex gap-sm">
                    <input type="text" className="tr-input-item" placeholder="Search" />
                    <button className="tr-btn tr-btn-icon">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <nav className="tr-nav d-flex gap-md">
                    <div className={styles.pageMenuWrapper}>
                        <button
                            onClick={()=>setShowPageMenu(prev=>!prev)}
                            className="page-menu-btn tr-btn tr-btn-link d-flex align-i-center gap-sm"
                        >   
                            Products
                            <i className="fas fa-caret-down"></i>
                        </button>
                        <ul className={`flex-col ${styles.pageMenu} ${showPageMenu && styles.activeMenu}`}>
                            <Link to="/products/Bats">Bats</Link>
                            <Link to="/products/Balls">Balls</Link>
                            <Link to="/products/Shoes">Shoes</Link>
                            <Link to="/products/Gears">Gears</Link>
                        </ul>
                    </div>
                    <Link to= "/auth" className="tr-btn tr-btn-link">{userIsLoggedIn ? 'Logout' : 'Login'}</Link>
                    <div className="badge-wrapper">
                        <Link to="/wishlist" className={`${styles.trBtnIcon} tr-btn tr-btn-icon`}>
                            <i className="fas fa-heart" ></i>
                        </Link>
                        {wishlistItems?.length !==0 && <Badge badgeCount={wishlistItems.length}/>}
                    </div>
                    <div className="badge-wrapper">
                        <Link to="/cart" className={`${styles.trBtnIcon} tr-btn tr-btn-icon`} >
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                        {cartItems.length !==0 && <Badge badgeCount={cartItems.length}/>}
                    </div>
                </nav>
            </div>
            <button className={`${styles.trBtnIcon} tr-btn tr-btn-icon hamburger hide`}>
                <i className="fas fa-bars"></i>
            </button>
        </div>
    )
}