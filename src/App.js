import "./App.css"
import MockAPI from "./mockMan";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Header, Footer } from "components";
import { Home, Products, Cart, Auth, Wishlist, AuthMiddleware } from "pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products/:category" element={<Products />} />
          <Route element={<AuthMiddleware/>}>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
          </Route>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/mock-api" element={<MockAPI/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
