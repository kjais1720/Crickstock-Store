import { OrderCard } from "components";
import { useAuth } from "contexts";
export function UserOrders() {
  const {
    userState: { user: {orders} },
  } = useAuth();
  return (
    <div className="pd-x-lg">
      <h2>Orders</h2>
      <div>
        {orders.map((order) => (
          <OrderCard key={order._id} {...order} />
        ))}
      </div>
    </div>
  );
}
