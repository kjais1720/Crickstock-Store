import styles from './empty-message.module.css'
import { Link } from "react-router-dom";
export default function EmptyPageMessage({pageName}){
  return (
    <div className="flex-center pd-y-xlg">
      <div
        className={`${styles.maxWidth500} flex-col align-i-center w-90 mr-x-auto`}
      >
        <h2>Ooops! Looks like your {pageName} is empty.</h2>
        <div className={`${styles.maxWidth350} banner mr-x-auto`}>
          <img src="/assets/empty_cart.webp"></img>
        </div>
        <Link to="/products/All Products" className="tr-btn tr-btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
