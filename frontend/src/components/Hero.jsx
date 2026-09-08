import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroFood from "../assets/images/transparent.png";

function Hero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    if (!searchTerm.trim()) return;

    navigate(
      `/search?q=${encodeURIComponent(searchTerm)}`
    );
  }

  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">

          <span className="hero-badge">
            🍔 Campus Food Delivery Made Easy
          </span>

          <h1>
            Order Delicious Food Around Campus
            <span> In Minutes.</span>
          </h1>

          <p>
            Discover the best restaurants around your campus, order your
            favourite meals, and get them delivered quickly to your hostel,
            lecture hall, or department.
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search restaurants, meals or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              Search
            </button>

          </div>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/restaurants")}
            >
              Browse Restaurants
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/partner")}
            >
              Become a Vendor
            </button>

          </div>

          <div className="hero-stats">

            <div className="stat-card">
              <h3>100+</h3>
              <p>Restaurants</p>
            </div>

            <div className="stat-card">
              <h3>5,000+</h3>
              <p>Students</p>
            </div>

            <div className="stat-card">
              <h3>30 mins</h3>
              <p>Delivery</p>
            </div>

          </div>

        </div>

        <div className="hero-image">

          <div className="floating-card rating-card">
            ⭐ 4.9 Rating
          </div>

          <img
            src={heroFood}
            alt="Delicious food"
            className="hero-food"
          />

          <div className="floating-card delivery-card">
            🛵 30 mins
          </div>

          <div className="floating-card popular-card">
            🔥 Popular
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;