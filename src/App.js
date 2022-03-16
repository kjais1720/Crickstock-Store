import "./App.css"
import MockAPI from "./mockMan";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Header, Footer } from "./components";
import { HomePage, ProductsPage, CartPage, AuthPage, WishlistPage } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/wishlist" element={<WishlistPage/>} />
          <Route path="/mock-api" element={<MockAPI/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
