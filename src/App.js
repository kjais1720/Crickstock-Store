import "./App.css"
import {
  Routes,
  Route,
} from "react-router-dom";

import { Header, Footer, Toast } from "components";
import { Home, Products, Cart, Auth, Wishlist, AuthMiddleware, NotFound, ComingSoon } from "pages";

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products/:category" element={<Products />} />
          <Route element={<AuthMiddleware/>}>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
          </Route>
          <Route path="/auth" element={<Auth/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/user/profile" element={<ComingSoon/>} />
        </Routes>
        <Footer/>
      <Toast/>
    </div>
  );
}

export default App;
