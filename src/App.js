import "./App.css";
// import { Routes, Route } from "react-router-dom";

import { Header, Footer, Toast, ScrollToTop } from "components";
// import {
//   Home,
//   Products,
//   Cart,
//   Auth,
//   Wishlist,
//   AuthMiddleware,
//   NotFound,
//   Profile,
//   UserAddresses,
//   UserInfo,
//   UserOrders
// } from "pages";
// import { Checkout } from "pages/checkout/checkout";
import AllRoutes from "AllRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <ScrollToTop>
        <AllRoutes/>
      </ScrollToTop>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
