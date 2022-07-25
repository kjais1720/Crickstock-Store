import styles from "./orderCard.module.css";
import { AddressCard } from "components";
export function OrderCard({ orderedProducts, deliveryAddress, createdAt, totalPrice }) {
  return (
    <div className={`${styles.orderTable} pd-xs`}>
      <div className="flex-col">
        <th>Ordered on</th>
        <td>{createdAt.slice(0, 10)}</td>
      </div>
      <div className="flex-col">
        <th>Products</th>
        <div className="flex-col">
          {orderedProducts.map(({ imgSrc, name, brand, price }) => {
            return (
              <article className={styles.productCard}>
                <figure className={styles.productImage}>
                  <img
                    className={styles.productImage}
                    src={imgSrc}
                    alt={name}
                  />
                </figure>
                <div className="flex-col justify-c-space-between">
                  <div>
                    <h3>{name}</h3>
                    <h4>{brand}</h4>
                  </div>
                  <h3>₹{price}</h3>
                </div>
              </article>
            );
          })}
          <div className="txt-right">
            Total Bill : {totalPrice}
          </div>
        </div>
      </div>
      <div className="flex-col">
        <th>Address</th>

        <AddressCard address={deliveryAddress} />
      </div>
    </div>
  );
}
