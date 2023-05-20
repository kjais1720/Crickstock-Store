import styles from "./checkout.module.css";
import { useState } from "react";
import { useCartWishlist, useAuth } from "contexts";
import { AddressCard } from "components/address/addressCard";
import { toast } from "react-toastify";
import { loadScript } from "utilities";
import { Link } from "react-router-dom";
export function Checkout() {
  const {
    userState: {
      user: { addresses },
    },
    createOrder,
  } = useAuth();
  const [ selectedAddress, setSelectedAddress ] = useState(() => addresses[0] ? {...addresses[0]} : null)
  const { cartItems, cartTotalEstimate } = useCartWishlist();
  const { price, discount, totalPrice, totalItems } = cartTotalEstimate;
  
  const changeSelectedAddress = (address) => setSelectedAddress({...address}); 
  const confirmOrder = () => {
    if(!selectedAddress){
      toast.error("Please select an address to confirm your order")
    }
  }
  const handlePayment = async () => {
    if(!selectedAddress){
      toast.error("Please select an address to confirm your order")
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      Toast({
        type: "error",
        message: "Failed to initiate payment, please try again.",
      });
    }

    const options = {
      key: process.env.REACT_APP_RZP_KEY_ID,
      amount: totalPrice * 100,
      currency: "INR",
      name: "Crickstock",
      description: "Payment for your order",
      handler: function (response) {
        const order = {
          paymentId: response?.razorpay_payment_id,
          totalPrice,
          orderedProducts: [...cartItems],
          deliveryAddress: {...selectedAddress},
        };
        createOrder(order)
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0C1D9D",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <section className={styles.checkoutPage}>
      <h2 className="txt-center my-lg">Checkout</h2>
      <div className={`${styles.checkoutGrid} d-flex gap-lg`}>
        <aside className="flex-col">
          <h3 className="txt-semibold txt-md txt-center">Select an Address</h3>
          <hr />
          {addresses.length >0 ? addresses.map((address, idx) => {
            return (
              <div className="d-flex">
                <input onChange={()=>changeSelectedAddress(address)} checked={selectedAddress._id === address._id} type="radio" id={"address"+address._id} />
                <label htmlFor={"address"+address._id}>
                  <AddressCard address={address} />
                </label>
              </div>
            );
          }) : 
          <div className="flex-col align-i-center">
            <p>Please add an address to proceed!</p>
            <Link className="tr-btn tr-btn-primary" to="/user/profile/addresses">
              Add New Address
            </Link>
          </div>
          }
        </aside>
        <aside className="flex-col flex-grow">
          <h3 className="txt-semibold txt-md txt-center">Order Summary</h3>
          <hr />
          <div className="flex-col">
            <h3>Products</h3>
            <div className="flex-col">
              {cartItems.map(({ name, imgSrc, brand, price }) => {
                return (
                  <article className={styles.productCard}>
                    <figure className={styles.productImage}>
                      <img
                        className={styles.productImage}
                        src={imgSrc}
                        alt={name}
                      />
                    </figure>
                    {/* <div className="flex-col justify-c-space-between"> */}
                      <div>
                        <h3 className="txt-primary">{name}</h3>
                        <h4>{brand}</h4>
                      </div>
                      <h3 className="ml-auto">₹{price}</h3>
                    {/* </div> */}
                  </article>
                );
              })}
            </div>
          </div>
            <h3>Price details</h3>
          <aside className="flex-col gap-md bs-lighter w-100 pd-sm">
            <div className="flex-col">
              <div className="d-flex justify-c-space-between">
                <span>
                  Price ({totalItems}{" "}
                  {totalItems === 1 || totalItems === 0 ? "item" : "items"})
                </span>
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
            <button onClick={handlePayment} className="tr-btn tr-btn-cta">
              Proceed to Buy
            </button>
          </aside>
        </aside>
      </div>
    </section>
  );
}
