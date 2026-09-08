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

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  createMenuItem,
  updateMenuItem,
} from "../../services/menuService";

import { getAllMenuCategories } from "../../services/menuCategoryService";

import { getMyRestaurant } from "../../services/restaurantService";

const MenuItemDialog = ({
  open,
  onClose,
  menuItem = null,
  onMenuItemSaved,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      categoryId: "",
      price: "",
      unit: "",
      isAvailable: true,
    });

  useEffect(() => {
    if (!open) return;

    fetchCategories();
  }, [open]);

  const fetchCategories = async () => {
    try {
      const response =
        await getAllMenuCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load categories."
      );
    }
  };

  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name || "",
        categoryId:
          menuItem.menu_category_id || "",
        price: menuItem.price || "",
        unit: menuItem.unit || "",
        isAvailable:
          menuItem.is_available,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const restaurant =
        await getMyRestaurant();

      const menuItemData = {
        restaurant_id: restaurant.id,
        menu_category_id:
          formData.categoryId,
        name: formData.name,
        price: Number(formData.price),
        unit: formData.unit,
        is_available:
          formData.isAvailable,
      };

      if (menuItem) {
        await updateMenuItem(
          menuItem.id,
          menuItemData
        );

        toast.success(
          "Menu item updated successfully!"
        );
      } else {
        await createMenuItem(
          menuItemData
        );

        toast.success(
          "Menu item created successfully!"
        );
      }

      if (onMenuItemSaved) {
        await onMenuItemSaved();
      }

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          `Failed to ${
            menuItem
              ? "update"
              : "create"
          } menu item.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={
        loading ? undefined : onClose
      }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {menuItem
          ? "Edit Menu Item"
          : "Add Menu Item"}
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
              disabled={loading}
            />

            <TextField
              select
              label="Category"
              name="categoryId"
              value={
                formData.categoryId
              }
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            >
              {categories.map(
                (category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />

            <TextField
              select
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
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
          <Button
            onClick={onClose}
            disabled={loading}
          >
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
            ) : menuItem ? (
              "Update Menu Item"
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