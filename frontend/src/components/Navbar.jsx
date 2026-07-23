function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        Campus<span>Bites</span>
      </div>

      <div className="nav-actions">
        <button className="theme-btn">
          Dark Mode
        </button>

        <button className="cart-btn">
          Cart (0)
        </button>
      </div>
    </header>
  );
}

export default Navbar;