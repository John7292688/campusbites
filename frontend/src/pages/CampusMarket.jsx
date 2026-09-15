import { FaWhatsapp } from "react-icons/fa";
import "../styles/campus-market.css";
import marketBanner from "../assets/marketbanner.png";

function CampusMarket() {
  const whatsappLink =
    "https://wa.me/2347046540252?text=Hello%20CampusBites,%20I%20would%20like%20to%20order%20foodstuffs.";

  return (
    <div className="campus-market">
      {/* Hero Section */}
      <section
        className="market-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
          ), url(${marketBanner})`,
        }}
      >
        <div className="market-overlay">
          <h1>CampusBites Market</h1>

          <p>
            Get fresh foodstuffs and groceries
            delivered directly to your hostel
            or residence.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="market-btn"
          >
            <FaWhatsapp />
            Order on WhatsApp
          </a>
        </div>
      </section>

      {/* About */}
      <section className="market-section">
        <h2>Skip the Market Stress</h2>

        <p>
          Need rice, beans, garri, yam,
          vegetables, noodles, eggs or other
          food items? CampusBites Market helps
          students buy foodstuffs easily without
          going to the market themselves.
        </p>
      </section>

      {/* Categories */}
      <section className="market-section">
        <h2>Available Categories</h2>

        <div className="market-grid">
          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c"
              alt="Rice"
            />
            <h3>Rice & Grains</h3>
          </div>

          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b"
              alt="Beans"
            />
            <h3>Beans & Garri</h3>
          </div>

          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Vegetables"
            />
            <h3>Vegetables</h3>
          </div>

          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1603048297172-c92544798d5a"
              alt="Cooking Essentials"
            />
            <h3>Cooking Essentials</h3>
          </div>

          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5"
              alt="Eggs"
            />
            <h3>Eggs & Proteins</h3>
          </div>

          <div className="market-card">
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
              alt="Noodles"
            />
            <h3>Noodles & Pasta</h3>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="market-section">
        <h2>How It Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span>1</span>
            <h3>Send Your List</h3>
            <p>
              Tell us the food items you need.
            </p>
          </div>

          <div className="step-card">
            <span>2</span>
            <h3>We Shop For You</h3>
            <p>
              We source quality products from
              trusted markets.
            </p>
          </div>

          <div className="step-card">
            <span>3</span>
            <h3>Get Delivery</h3>
            <p>
              Your items are delivered to your
              hostel or residence.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="market-section">
        <h2>Why Students Love It</h2>

        <div className="benefits-grid">
          <div>✅ Saves Time</div>
          <div>✅ Affordable</div>
          <div>✅ Reliable Delivery</div>
          <div>✅ No Market Stress</div>
          <div>✅ Convenient</div>
          <div>✅ Fresh Food Items</div>
        </div>
      </section>

      {/* CTA */}
      <section className="market-cta">
        <h2>
          Ready To Order Your Foodstuffs?
        </h2>

        <p>
          Click below and send us your list on
          WhatsApp.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="market-btn"
        >
          <FaWhatsapp />
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}

export default CampusMarket;