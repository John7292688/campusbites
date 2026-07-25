import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurantService";
import { getRestaurantMenu } from "../services/menuService";
import { addToCart } from "../services/cartService";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [groupedMenu, setGroupedMenu] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);

        const menu = await getRestaurantMenu(id);

        setMenuItems(menu.menuItems);

        const grouped = menu.menuItems.reduce((acc, item) => {
  if (!acc[item.category_name]) {
    acc[item.category_name] = [];
  }

  acc[item.category_name].push(item);

  return acc;
}, {});

setGroupedMenu(grouped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [id]);

  

  async function handleAddToCart(menuItemId) {
    try {
      await addToCart(menuItemId);

      alert("Item added to cart successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  const increaseQuantity = (item) => {
  setSelectedItems((prev) => ({
    ...prev,
    [item.id]: {
      ...item,
      quantity: (prev[item.id]?.quantity || 0) + 1,
    },
  }));
};

const decreaseQuantity = (itemId) => {
  setSelectedItems((prev) => {
    const updated = { ...prev };

    if (!updated[itemId]) return updated;

    if (updated[itemId].quantity <= 1) {
      delete updated[itemId];
    } else {
      updated[itemId].quantity--;
    }

    return updated;
  });
};

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

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "35% 65%",
      gap: "30px",
      alignItems: "start",
      marginTop: "20px",
    }}
  >
    {/* LEFT COLUMN */}
    <div>
      <h3
        style={{
          marginBottom: "16px",
        }}
      >
        Preset Combos & Packages
      </h3>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          minHeight: "500px",
        }}
      >
        <p
          style={{
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          Combo packages will appear here.
        </p>
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div>
      <h3
        style={{
          marginBottom: "16px",
        }}
      >
        Build Your Own Plate
      </h3>

      {menuItems.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <div>
          {Object.entries(groupedMenu).map(
            ([categoryName, items]) => (
              <div
                key={categoryName}
                style={{
                  marginBottom: "30px",
                }}
              >
                <h3
                  style={{
                    borderBottom:
                      "2px solid #f59e0b",
                    paddingBottom: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {categoryName}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "16px 20px",
                        boxShadow:
                          "0 4px 12px rgba(0,0,0,0.08)",
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            margin: 0,
                          }}
                        >
                          {item.name}
                        </h4>

                        <p
                          style={{
                            margin: "6px 0",
                            color: "#6b7280",
                            fontSize: "14px",
                          }}
                        >
                          {item.unit}
                        </p>

                        <strong
                          style={{
                            color: "#f59e0b",
                          }}
                        >
                          ₦
                          {Number(
                            item.price
                          ).toLocaleString()}
                        </strong>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: "none",
                            background:
                              "#e5e7eb",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          −
                        </button>

                        <strong>
                          {selectedItems[item.id]
                            ?.quantity || 0}
                        </strong>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item
                            )
                          }
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: "none",
                            background:
                              "#f59e0b",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  </div>
</div>
    </section>
  );
}

export default RestaurantDetails;