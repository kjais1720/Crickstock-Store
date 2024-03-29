import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  getLoggedInUser,
} from "./backend/controllers/AuthController";
import {
  addItemToCartHandler,
  getCartItemsHandler,
  removeItemFromCartHandler,
  updateCartItemHandler,
} from "./backend/controllers/CartController";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import {
  getAllProductsHandler,
  getProductHandler,
} from "./backend/controllers/ProductController";
import {
  addItemToWishlistHandler,
  getWishlistItemsHandler,
  removeItemFromWishlistHandler,
} from "./backend/controllers/WishlistController";
import {
  getAddressesHandler,
  addNewAddressesHandler,
  removeAddressHandler,
  updateAddressHandler,
} from "./backend/controllers/AddressController";
import {
  getOrdersHandler,
  addNewOrderHandler,
} from "./backend/controllers/OrdersController";
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
      addresses: Model,
      orders: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      // disballing console logs from Mirage
      server.logging = false;
      products.forEach((item) => {
        server.create("product", { ...item });
      });

      users.forEach((item) =>
        server.create("user", {
          ...item,
          cart: [],
          wishlist: [],
          addresses: item.addresses ?? [],
          orders: item.orders ?? [],
        })
      );

      categories.forEach((item) => server.create("category", { ...item }));
    },

    routes() {
      this.namespace = "api";
      this.passthrough(" https://api.razorpay.com/v1/")
      // auth routes (public)
      this.get("/auth/user", getLoggedInUser.bind(this));
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // products routes (public)
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:productId", getProductHandler.bind(this));

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // cart routes (private)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete(
        "/user/cart/:productId",
        removeItemFromCartHandler.bind(this)
      );

      // wishlist routes (private)
      this.get("/user/wishlist", getWishlistItemsHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete(
        "/user/wishlist/:productId",
        removeItemFromWishlistHandler.bind(this)
      );

      //Address routes
      this.get("/user/address", getAddressesHandler.bind(this));
      this.post("/user/address", addNewAddressesHandler.bind(this));
      this.delete("/user/address/:addressId", removeAddressHandler.bind(this));
      this.post("/user/address/:addressId", updateAddressHandler.bind(this));

      // Order routes
      this.get("/user/order", getOrdersHandler.bind(this));
      this.post("/user/order", addNewOrderHandler.bind(this));
    },
  });
}
