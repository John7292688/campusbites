import { useEffect, useState } from "react";
import {
  getRestaurantMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/menuService";
import { getMyRestaurant } from "../../services/restaurantService";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import MenuItemDialog from "../../components/owner/MenuItemDialog";

const MenuItems = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

useEffect(() => {
  fetchMenuItems();
}, []);

const fetchMenuItems = async () => {
  try {
    const restaurant = await getMyRestaurant();

    const response = await getRestaurantMenu(
      restaurant.id
    );

    setMenuItems(response.menuItems);
  } catch (error) {
    console.error(error);
  }
};
console.log(menuItems);

const handleToggleAvailability = async (item) => {
  // Save the current state in case we need to roll back
  const previousItems = [...menuItems];

  // Instantly update the UI
  setMenuItems((prev) =>
    prev.map((menuItem) =>
      menuItem.id === item.id
        ? {
            ...menuItem,
            is_available: !menuItem.is_available,
          }
        : menuItem
    )
  );

  try {
    await updateMenuItem(item.id, {
      restaurant_id: item.restaurant_id,
      name: item.name,
      price: item.price,
      unit: item.unit,
      menu_category_id: item.menu_category_id,
      is_available: !item.is_available,
    });
  } catch (error) {
    // Restore previous state if the request fails
    setMenuItems(previousItems);

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update menu item."
    );
  }
};

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
            }}
          >
            Menu Items
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Manage all food and drinks available in your
            restaurant.
          </p>
        </div>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Menu Item
        </Button>
      </div>

      {menuItems.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      marginTop: "100px",
      color: "#6b7280",
    }}
  >
    <h2>No menu items yet</h2>

    <p>
      Click <strong>Add Menu Item</strong> to create your
      first menu item.
    </p>
  </div>
) : (
  <div
    style={{
      display: "grid",
      gap: "16px",
    }}
  >
    {menuItems.map((item) => (
  <div
    key={item.id}
    style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "20px 24px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    }}
  >
    {/* Left */}
    <div style={{ flex: 1 }}>
      <h3
        style={{
          margin: 0,
          color: "#1f2937",
          fontSize: "20px",
        }}
      >
        🍽 {item.name}
      </h3>

      <p
        style={{
          margin: "8px 0",
          color: "#6b7280",
        }}
      >
        {item.category_name} • {item.unit}
      </p>

      <button
        onClick={() =>
          handleToggleAvailability(item)
        }
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "999px",
          fontSize: "13px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          transition: "0.2s",

          background: item.is_available
            ? "#DCFCE7"
            : "#FEE2E2",

          color: item.is_available
            ? "#15803D"
            : "#B91C1C",
        }}
      >
        {item.is_available
          ? "🟢 Available"
          : "🔴 Unavailable"}
      </button>
    </div>

    {/* Right */}
    <div
      style={{
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minWidth: "170px",
      }}
    >
      <strong
        style={{
          color: "#F59E0B",
          fontSize: "22px",
        }}
      >
        ₦{Number(item.price).toLocaleString()}
      </strong>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button
  variant="outlined"
  size="small"
  onClick={() => {
    setSelectedMenuItem(item);
    setOpenDialog(true);
  }}
>
  Edit
</Button>

        <Button
  variant="contained"
  color="error"
  size="small"
  onClick={async () => {
    const confirmed = window.confirm(
      `Delete "${item.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteMenuItem(item.id);

await fetchMenuItems();

alert("Menu item deleted successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete menu item."
      );
    }
  }}
>
  Delete
</Button>
      </div>
    </div>
  </div>
))}
  </div>
)}

      <MenuItemDialog
  open={openDialog}
  menuItem={selectedMenuItem}
  onClose={() => {
    setOpenDialog(false);
    setSelectedMenuItem(null);
  }}
  onMenuItemSaved={fetchMenuItems}
/>
    </>
  );
};

export default MenuItems;