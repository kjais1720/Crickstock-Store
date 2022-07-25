import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoaderForComponent } from "components";
import { UserAddresses } from "pages/profile/components/userAddresses";
import { UserOrders } from "pages/profile/components/userOrders";
const Home = lazy(() => import("pages/home/home"));
const Products = lazy(() => import("pages/products/productsListing"));
const Cart = lazy(() => import("pages/cart/cart"));
const Auth = lazy(() => import("pages/auth/auth"));
const Wishlist = lazy(() => import("pages/wishlisht/wishlist"));
const Checkout = lazy(() => import("pages/checkout/checkout"));
const AuthMiddleware = lazy(() =>
  import("pages/auth-middleware/authMiddleware")
);
const NotFound = lazy(() => import("pages/error/not-found"));
const Profile = lazy(() => import("pages/profile/profile"));

export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="txt-center">
          <LoaderForComponent />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route element={<AuthMiddleware />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user/profile" element={<Profile />}>
            <Route path="addresses" element={<UserAddresses />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
