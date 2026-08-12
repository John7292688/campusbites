import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

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
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/contact">Contact</Link>
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