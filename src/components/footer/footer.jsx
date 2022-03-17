import { Link } from "react-router-dom";
export const Footer = () =>{
    return (
        <footer className="bg-primary">
            <div className="d-grid grid-autofit-md">
                <div className="flex-col brand-info">
                    <Link to='/' className='logo'>
                        <img src='/assets/crickstock-logo.png' alt = "Crickstock logo"/>
                    </Link>
                    <div className="txt-white">
                        <i className="fas fa-map-marker-alt"></i>
                        123 - Maple street, Anytown, CA 171001
                    </div>
                    <div className="txt-white">
                        <i className="fas fa-envelope"></i>
                        crickstock@gmail.com
                    </div>
                </div>
                <div className="subscribe flex-col">
                    <h3 className='txt-white'>Subscribe to get updates about latest offers</h3>
                    <div className="d-flex">
                        <input type="text" aria-label="Enter your Email" placeholder='Email' className="tr-input-item" />
                        <button className="tr-btn tr-btn-cta">Subscribe</button>
                    </div>
                </div>
                <div className="d-flex justify-c-center gap-sm">
                    <ul className="footer-links flex-col">
                        <h3 className="txt-white txt-left">Quick links</h3>
                        <Link to="/wishlist" className="tr-btn tr-btn-link">Wishlist
                        </Link>
                        <Link to="/cart" className="tr-btn tr-btn-link">Cart
                        </Link>
                        <Link to="/auth" className="tr-btn tr-btn-link">Login/Signup
                        </Link>
                    </ul>
                    <ul className="footer-links flex-col">
                        <h3 className="txt-white txt-left">Products</h3>
                        <Link to="/products/Bats" className="tr-btn tr-btn-link">Cricket Bats
                        </Link>
                        <Link to="/products/Balls" className="tr-btn tr-btn-link">Cricket Balls
                        </Link>
                        <Link to="/products/Shoes" className="tr-btn tr-btn-link">Cricket Shoes
                        </Link>
                        <Link to="/products/Gears" className="tr-btn tr-btn-link">Cricket Gears
                        </Link>
                    </ul>
                </div>
            </div>

            <div className="author-info flex-col align-i-center gap-sm">
                <ul className="d-flex gap-sm">
                    <a target="_blank" href="https://twitter.com/kjais1720" className="tr-btn tr-btn-icon" aria-label="Twitter link">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a target="_blank" href="https://github.com/kjais1720" className="tr-btn tr-btn-icon" aria-label="Github link">
                        <i className="fab fa-github"></i>
                    </a>
                    <a target="_blank" href="https://linkedin.com/in/krituraj-anand" className="tr-btn tr-btn-icon" aria-label="LinkedIn link">
                        <i className="fab fa-linkedin"></i>    
                    </a>
                </ul>
                <p className="txt-white">Created by<a target="_blank" href="https://kjais-portfolio.vercel.app" className="tr-btn tr-btn-link">Krituraj Anand</a> </p>
            </div>

        </footer>
    )
} 