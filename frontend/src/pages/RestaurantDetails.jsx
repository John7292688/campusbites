import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurantService";
import {
  getAvailableRestaurantMenu,
} from "../services/menuService";
import "../styles/restaurantDetails.css";
import { getRestaurantComboPackages } from "../services/comboPackageService";
import { createCustomPlate } from "../services/customPlateService";
import { useCart } from "../context/CartContext";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [groupedMenu, setGroupedMenu] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [comboPackages, setComboPackages] = useState([]);
  const { addItemToCart } = useCart();
  const selectedPlateItems = Object.values(selectedItems).filter(
    (item) => item.quantity > 0
  );

  const plateTotal = selectedPlateItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);

        const [menu, combos] = await Promise.all([
          getAvailableRestaurantMenu(id),
          getRestaurantComboPackages(id),
        ]);

        console.log("Restaurant ID:", id);
        console.log("Menu Response:", menu);
        console.log("Combo Response:", combos);

        setComboPackages(combos.data);

        setMenuItems(menu.menuItems);

        const grouped = menu.menuItems.reduce((acc, item) => {
          if (!acc[item.category_name]) {
            acc[item.category_name] = [];
          }

          acc[item.category_name].push(item);

          return acc;
        }, {});

        setGroupedMenu(grouped);

setGroupedMenu(grouped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [id]);

  

  async function handleAddCombo(combo) {
  try {
    await addItemToCart({
      comboPackageId: combo.id,
      quantity: 1,
    });

    alert("Combo package added to cart!");
  } catch (error) {
    alert(error.message);
  }
}

async function handleCreateCustomPlate() {
  try {
    const items = Object.values(selectedItems)
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));

    if (items.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    // Step 1: Create the custom plate
    const response = await createCustomPlate(
      Number(id),
      items
    );

    const customPlateId = response.customPlate.id;

    // Step 2: Add it to the cart
    await addItemToCart({
      customPlateId,
      quantity: 1,
    });

    // Step 3: Clear current selections
    setSelectedItems({});

    alert("Custom plate created and added to cart!");
  } catch (error) {
    console.error(error);

    alert(
      error.message ||
        "Failed to create custom plate."
    );
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
    if (!prev[itemId]) return prev;

    if (prev[itemId].quantity <= 1) {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    }

    return {
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: prev[itemId].quantity - 1,
      },
    };
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
          <div className="restaurant-header">
            <div className="restaurant-info">
              <h1>{restaurant.name}</h1>

              <div className="restaurant-meta">
                <span>📍 {restaurant.location}</span>

                <span>
                  🍽️ {restaurant.description}
                </span>

                <span>
                  📞 {restaurant.phone}
                </span>
              </div>
            </div>

            {restaurant.logo_url && (
              <img
                src={restaurant.logo_url}
                alt={`${restaurant.name} Logo`}
                className="restaurant-logo"
              />
            )}
          </div>
        </div>
      </div>

      <div className="restaurant-menu">
  <h2>Menu</h2>

  <div className="restaurant-layout">
    {/* LEFT COLUMN */}
<div className="preset-combos-panel">
  {comboPackages.length === 0 ? (
    <p
      style={{
        textAlign: "center",
        color: "#6b7280",
        padding: "30px 0",
      }}
    >
      No combo packages available.
    </p>
  ) : (
    comboPackages.map((combo) => (
      <div
        key={combo.id}
        className="combo-card"
      >
        <div className="combo-content">
          <div>
            <h4 className="combo-title">
              {combo.name}
            </h4>

            <p className="combo-description">
              {combo.items_included}
            </p>

            <strong className="combo-price">
              ₦
              {Number(combo.price).toLocaleString()}
            </strong>
          </div>

          <img
            className="combo-image"
            src={
              combo.image ||
              "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80"
            }
            alt={combo.name}
          />
        </div>

        <button
          className="combo-btn"
          onClick={() => handleAddCombo(combo)}
        >
          Add Combo
        </button>
      </div>
    ))
  )}
</div>
      {/* RIGHT COLUMN */}
      <div>
        <h3 className="restaurant-panel-title">
          Build Your Own Plate
        </h3>

        {menuItems.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          <div className="build-plate-container">
            {Object.entries(groupedMenu).map(
              ([categoryName, items]) => (
                <div
                  key={categoryName}
                  className="build-category"
                >
                  <h4 className="build-category-title">
                    CHOOSE YOUR{" "}
                    {categoryName.toUpperCase()}
                  </h4>

                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="build-row"
                      style={{
                        borderBottom:
                          index !== items.length - 1
                            ? "1px solid #ececec"
                            : "none",
                      }}
                    >
                      <div className="build-item-info">
                        <span className="build-item-name">
                          {item.name}
                        </span>

                        <span className="build-item-unit">
                          ({item.unit})
                        </span>
                      </div>

                      <div className="build-item-price">
                        ₦{Number(item.price).toLocaleString()}
                      </div>

                      <div className="quantity-control">
                        <button
                          className="qty-btn minus"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          −
                        </button>

                        <span className="qty-value">
                          {selectedItems[item.id]
                            ?.quantity || 0}
                        </span>

                        <button
                          className="qty-btn plus"
                          onClick={() =>
                            increaseQuantity(item)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            <div className="plate-summary">
              <h4>Plate Summary</h4>

              {selectedPlateItems.length === 0 ? (
                <p
                  style={{
                    color: "#6b7280",
                    margin: "16px 0",
                  }}
                >
                  No items selected.
                </p>
              ) : (
                <>
                  {selectedPlateItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0",
                      }}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <strong>
                        ₦
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </strong>
                    </div>
                  ))}

                  <hr
                    style={{
                      margin: "18px 0",
                      border: "none",
                      borderTop: "1px solid #e5e7eb",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong>Total</strong>

                    <strong className="plate-total">
                      ₦{plateTotal.toLocaleString()}
                    </strong>
                  </div>
                </>
              )}

              <button
                className="create-plate-btn"
                disabled={selectedPlateItems.length === 0}
                onClick={handleCreateCustomPlate}
              >
                Create Custom Plate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
}

export default RestaurantDetails;