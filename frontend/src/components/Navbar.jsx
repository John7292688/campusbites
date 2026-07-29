import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar({ openCart }) {
  const { cartCount } = useCart();
  const navigate = useNavigate();

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

          <button
            className="cart-btn"
            onClick={openCart}
          >
            🛒
            <span>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;