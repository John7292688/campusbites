import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">
            Campus<span>Bites</span>
          </h2>

          <p>
            Campus food delivery made simple.
            Discover restaurants, order meals,
            and enjoy fast delivery around campus.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/restaurants">
            Restaurants
          </Link>
          <Link to="/packages">
            Packages
          </Link>
          <Link to="/my-orders">
            Orders
          </Link>
          <Link to="/contact">
            Contact
          </Link>
        </div>

        <div className="footer-section">
          <h3>For Vendors</h3>

          <Link to="/partner">
            Become a Vendor
          </Link>

          <Link to="/restaurant/login">
            Vendor Login
          </Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Osun State Polytechnic, Iree</p>
          <p>📞 +234 XXX XXX XXXX</p>
          <p>✉️ support@campusbites.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 CampusBites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;