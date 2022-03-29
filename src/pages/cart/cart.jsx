import { useCartWishlist, useProduct, useAuth } from "contexts";
import { HorizontalProductCard } from "components";
import { EmptyPageMessage } from "../empty-page-message/empty-page-message";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

export function Cart() {
  document.title = "My Cart | Crickstock";
  const { cartItems, cartTotalEstimate } = useCartWishlist();
  const { price, discount, totalPrice, totalItems } = cartTotalEstimate;

  return cartItems[0] ? (
    <main className="pd-md">
      <h2 className="txt-center">My cart</h2>
      <div className="d-flex f-wrap justify-c-center align-i-start gap-xlg pd-y-lg">
        <div id="productCardsContainer" className="cart-items flex-col gap-md">
          {cartItems.map((item) => (
            <HorizontalProductCard
              key={item._id}
              product={item}
              isCartCard={true}
            />
          ))}
        </div>
        <aside className="cart-summary tr-card flex-col gap-md pd-md">
          <h3 className="txt-semibold">Price details</h3>
          <hr />
          <div className="flex-col">
            <div className="d-flex justify-c-space-between">
              <span>
                Price ({totalItems}{" "}
                {totalItems === 1 || totalItems === 0
                  ? "item"
                  : "items"}{" "}
                )
              </span>{" "}
              <span>₹{price}</span>
            </div>
            <div className="d-flex justify-c-space-between">
              <span className="txt-success">Discount</span>{" "}
              <span className="txt-success">-₹{discount}</span>
            </div>
            <div className="d-flex justify-c-space-between">
              <span>Delivery charges</span> <span>₹100</span>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-c-space-between">
            <h3>TOTAL AMOUNT</h3> <h3>₹{totalPrice + 100}</h3>
          </div>

          <p>You will save ₹{discount} on this order</p>
          <button className="tr-btn tr-btn-cta">PLACE ORDER</button>
        </aside>
      </div>
    </main>
  ) : (
    <EmptyPageMessage pageName={"Cart"} />
  );
}
