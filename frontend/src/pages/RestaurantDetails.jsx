import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurantService";
import { getRestaurantMenu } from "../services/menuService";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);

        const menu = await getRestaurantMenu(id);
        setMenuItems(menu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!restaurant) {
    return <h2 style={{ textAlign: "center" }}>Restaurant not found.</h2>;
  }

  return (
  <section className="restaurant-details">
    <div className="restaurant-hero">

      <img
        className="restaurant-hero-image"
        src={
          restaurant.image_url ||
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
        }
        alt={restaurant.name}
      />

      <div className="restaurant-hero-content">

        <h1>{restaurant.name}</h1>

        <p className="restaurant-location">
          📍 {restaurant.location}
        </p>

        <p className="restaurant-description">
          {restaurant.description}
        </p>

        <p className="restaurant-phone">
          📞 {restaurant.phone}
        </p>

      </div>

    </div>
    <div className="restaurant-menu">
  <h2>Menu</h2>

  {menuItems.length === 0 ? (
    <p>No menu items available.</p>
  ) : (
    <div className="menu-grid">
      {menuItems.map((item) => (
        <div className="menu-card" key={item.id}>
          <h3>{item.name}</h3>

          <p>{item.description}</p>

          <h4>₦{item.price}</h4>

          <button className="view-menu-btn">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )}
</div>
  </section>
);
}

export default RestaurantDetails;