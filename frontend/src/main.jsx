import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/categories.css";
import "./styles/restaurants.css";
import "./styles/restaurant-details.css";
import "./styles/footer.css";
import "./styles/responsive.css";
import "./styles/cart-drawer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);