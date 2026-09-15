import { FaWhatsapp } from "react-icons/fa";
import "../styles/campus-market.css";
import marketBanner from "../assets/images/marketbanner.png";
import riceImg from "../assets/images/rawrice.jfif";
import beansImg from "../assets/images/rawbeans.jfif";
import eggsImg from "../assets/images/raweggs.jfif";
import noodlesImg from "../assets/images/rawnoodles.jfif";
import palmoilImg from "../assets/images/rawpalmoil.jfif";
import vegetablesImg from "../assets/images/rawvegetables.jfif";
import vegetableoilImg from "../assets/images/rawvegetableoil.jfif";
import beefImg from "../assets/images/rawbeef.jfif";

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
              src={riceImg}
              alt="Rice"
            />
            <h3>Rice</h3>
          </div>

          <div className="market-card">
            <img
              src={beansImg}
              alt="Beans"
            />
            <h3>Beans</h3>
          </div>

          <div className="market-card">
            <img
              src={vegetablesImg}
              alt="Vegetables"
            />
            <h3>Vegetables</h3>
          </div>

          <div className="market-card">
            <img
              src={eggsImg}
              alt="Cooking Essentials"
            />
            <h3>Eggs</h3>
          </div>

          <div className="market-card">
            <img
              src={palmoilImg}
              alt="Eggs"
            />
            <h3>Palmoil</h3>
          </div>

          <div className="market-card">
            <img
              src={noodlesImg}
              alt="Noodles"
            />
            <h3>Noodles & Pasta</h3>
          </div>

          <div className="market-card">
            <img
              src={vegetableoilImg}
              alt="Noodles"
            />
            <h3>Vegetable Oil</h3>
          </div>        

          <div className="market-card">
            <img
              src={beefImg}
              alt="Noodles"
            />
            <h3>Fresh Beef</h3>
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