import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurants } from "../services/restaurantService";

function FeaturedRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchRestaurants() {
        try {
        const data = await getRestaurants();
        setRestaurants(data);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    fetchRestaurants();
    }, []);
  return (
    <section className="restaurants">
      <div className="container">
        <div className="section-title">
          <h2>Featured Restaurants</h2>
          <p>
            Discover the highest-rated restaurants around your campus.
          </p>
        </div>

        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
               <img
                src={
                    restaurant.image_url ||
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                }
                alt={restaurant.name}
                />

              <div className="restaurant-content">
                <h3>{restaurant.name}</h3>

                <p className="restaurant-location">
                📍 {restaurant.location}
                </p>

                <p className="restaurant-description">
                {restaurant.description}
                </p>

                <div className="restaurant-info">
                <Link
                to={`/restaurants/${restaurant.id}`}
                className="view-menu-btn"
                >
                View Menu
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRestaurants;