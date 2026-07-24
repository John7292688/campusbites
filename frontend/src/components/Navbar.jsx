import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const cartItems = await getCart();
        setCartCount(
          cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          )
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchCart();
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="logo">
          Campus<span>Bites</span>
        </div>

        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Restaurants</a>
          <a href="#">Categories</a>
          <a href="#">Packages</a>
          <a href="#">Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="theme-btn">
            🌙
          </button>

          <button className="cart-btn">
            🛒
            <span>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;