import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header, Footer, Toast } from "components";
import {
  Home,
  Products,
  Cart,
  Auth,
  Wishlist,
  AuthMiddleware,
  NotFound,
  ComingSoon,
  Profile,
  UserAddresses,
  UserInfo,
  UserOrders
} from "pages";
import { Checkout } from "pages/checkout/checkout";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route element={<AuthMiddleware />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user/profile" element={<Profile />} >
            <Route path="" element={<UserInfo/>}/>
            <Route path="info" element={<UserInfo/>}/>
            <Route path="addresses" element={<UserAddresses/>}/>
            <Route path="orders" element={<UserOrders/>}/>
          </Route>
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
