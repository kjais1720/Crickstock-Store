import "./App.css"
import MockAPI from "./mockMan";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Header, Footer } from "components";
import { Home, Products, Cart, Auth, Wishlist } from "pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/mock-api" element={<MockAPI/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
