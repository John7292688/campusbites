import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import {
  createMenuItem,
  updateMenuItem,
} from "../../services/menuService";
import { useEffect, useState } from "react";
import { getAllMenuCategories } from "../../services/menuCategoryService";
import { getMyRestaurant } from "../../services/restaurantService";

const MenuItemDialog = ({
  open,
  onClose,
  menuItem = null,
  onMenuItemSaved,
}) => {
  const [loading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    unit: "",
    isAvailable: true,
  });

  useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await getAllMenuCategories();
    setCategories(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (menuItem) {
    setFormData({
      name: menuItem.name || "",
      categoryId: menuItem.menu_category_id || "",
      price: menuItem.price || "",
      unit: menuItem.unit || "",
      isAvailable: menuItem.is_available,
    });
  } else {
    setFormData({
      name: "",
      categoryId: "",
      price: "",
      unit: "",
      isAvailable: true,
    });
  }
}, [menuItem, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const restaurant = await getMyRestaurant();

    const menuItemData = {
    restaurant_id: restaurant.id,
    menu_category_id: formData.categoryId,
    name: formData.name,
    price: Number(formData.price),
    unit: formData.unit,
    is_available: formData.isAvailable,
    };

    if (menuItem) {
  await updateMenuItem(menuItem.id, menuItemData);

  alert("Menu item updated successfully!");
} else {
  await createMenuItem(menuItemData);

  alert("Menu item created successfully!");
}

if (onMenuItemSaved) {
  await onMenuItemSaved();
}

onClose();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to create menu item."
    );
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add Menu Item
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
            select
            label="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            fullWidth
            required
            >
            {categories.map((category) => (
                <MenuItem
                key={category.id}
                value={category.id}
                >
                {category.name}
                </MenuItem>
            ))}
            </TextField>

            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
                select
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                fullWidth
                required
                >
                <MenuItem value="Per Spoon">
                    Per Spoon
                </MenuItem>

                <MenuItem value="Per Portion">
                    Per Portion
                </MenuItem>

                <MenuItem value="Per Wrap">
                    Per Wrap
                </MenuItem>

                <MenuItem value="Per Piece">
                    Per Piece
                </MenuItem>

                <MenuItem value="Per Bottle">
                    Per Bottle
                </MenuItem>

                <MenuItem value="Per Cup">
                    Per Cup
                </MenuItem>

                <MenuItem value="Per Slice">
                    Per Slice
                </MenuItem>

                <MenuItem value="Per Stick">
                    Per Stick
                </MenuItem>
            </TextField>

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Save Menu Item"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MenuItemDialog;