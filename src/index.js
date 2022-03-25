import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider, ProductProvider, CartWishlistProvider } from "contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartWishlistProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartWishlistProvider>
		</AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
