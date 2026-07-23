import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/categories.css";
import "./styles/restaurants.css";
import "./styles/restaurant-details.css";
import "./styles/footer.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);