import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  getRestaurantMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/menuService";

import { getMyRestaurant } from "../../services/restaurantService";

import MenuItemDialog from "../../components/owner/MenuItemDialog";

const MenuItems = () => {
  const [openDialog, setOpenDialog] =
    useState(false);

  const [selectedMenuItem, setSelectedMenuItem] =
    useState(null);

  const [menuItems, setMenuItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [updatingAvailability, setUpdatingAvailability] =
    useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [itemToDelete, setItemToDelete] =
    useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);

      const restaurant =
        await getMyRestaurant();

      const response =
        await getRestaurantMenu(
          restaurant.id
        );

      setMenuItems(
        response.menuItems || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load menu items."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability =
    async (item) => {
      const previousItems = [
        ...menuItems,
      ];

      setUpdatingAvailability(
        item.id
      );

      setMenuItems((prev) =>
        prev.map((menuItem) =>
          menuItem.id === item.id
            ? {
                ...menuItem,
                is_available:
                  !menuItem.is_available,
              }
            : menuItem
        )
      );

      try {
        await updateMenuItem(
          item.id,
          {
            restaurant_id:
              item.restaurant_id,
            name: item.name,
            price: item.price,
            unit: item.unit,
            menu_category_id:
              item.menu_category_id,
            is_available:
              !item.is_available,
          }
        );

        toast.success(
          `Menu item ${
            !item.is_available
              ? "enabled"
              : "disabled"
          }.`
        );
      } catch (error) {
        setMenuItems(previousItems);

        console.error(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update menu item."
        );
      } finally {
        setUpdatingAvailability(
          null
        );
      }
    };

  const handleDeleteClick = (
    item
  ) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm =
    async () => {
      try {
        setDeleteLoading(true);

        await deleteMenuItem(
          itemToDelete.id
        );

        toast.success(
          "Menu item deleted successfully!"
        );

        setDeleteDialogOpen(false);
        setItemToDelete(null);

        await fetchMenuItems();
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to delete menu item."
        );
      } finally {
        setDeleteLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
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
            Manage all food and drinks
            available in your
            restaurant.
          </p>
        </div>

        <Button
          variant="contained"
          startIcon={
            <AddRoundedIcon />
          }
          onClick={() =>
            setOpenDialog(true)
          }
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
          <h2>
            No menu items yet
          </h2>

          <p>
            Click{" "}
            <strong>
              Add Menu Item
            </strong>{" "}
            to create your first
            menu item.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {menuItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  background:
                    "#fff",
                  borderRadius:
                    "16px",
                  padding:
                    "20px 24px",
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.08)",
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: "20px",
                  flexWrap:
                    "wrap",
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color:
                        "#1f2937",
                    }}
                  >
                    🍽 {item.name}
                  </h3>

                  <p
                    style={{
                      margin:
                        "8px 0",
                      color:
                        "#6b7280",
                    }}
                  >
                    {
                      item.category_name
                    }{" "}
                    • {item.unit}
                  </p>

                  <button
                    disabled={
                      updatingAvailability ===
                      item.id
                    }
                    onClick={() =>
                      handleToggleAvailability(
                        item
                      )
                    }
                    style={{
                      display:
                        "inline-block",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",
                      border:
                        "none",
                      cursor:
                        "pointer",
                      background:
                        item.is_available
                          ? "#DCFCE7"
                          : "#FEE2E2",
                      color:
                        item.is_available
                          ? "#15803D"
                          : "#B91C1C",
                    }}
                  >
                    {updatingAvailability ===
                    item.id ? (
                      "Updating..."
                    ) : item.is_available ? (
                      "🟢 Available"
                    ) : (
                      "🔴 Unavailable"
                    )}
                  </button>
                </div>

                <div
                  style={{
                    textAlign:
                      "right",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "12px",
                  }}
                >
                  <strong
                    style={{
                      color:
                        "#F59E0B",
                      fontSize:
                        "22px",
                    }}
                  >
                    ₦
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </strong>

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedMenuItem(
                          item
                        );

                        setOpenDialog(
                          true
                        );
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDeleteClick(
                          item
                        )
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <MenuItemDialog
        open={openDialog}
        menuItem={
          selectedMenuItem
        }
        onClose={() => {
          setOpenDialog(false);
          setSelectedMenuItem(
            null
          );
        }}
        onMenuItemSaved={
          fetchMenuItems
        }
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() =>
          !deleteLoading &&
          setDeleteDialogOpen(
            false
          )
        }
      >
        <DialogTitle>
          Delete Menu Item
        </DialogTitle>

        <DialogContent>
          Are you sure you want
          to delete{" "}
          <strong>
            {
              itemToDelete?.name
            }
          </strong>
          ?
          <br />
          <br />
          This action cannot be
          undone.
        </DialogContent>

        <DialogActions>
          <Button
            disabled={
              deleteLoading
            }
            onClick={() =>
              setDeleteDialogOpen(
                false
              )
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            disabled={
              deleteLoading
            }
            onClick={
              handleDeleteConfirm
            }
          >
            {deleteLoading ? (
              <CircularProgress
                size={20}
                color="inherit"
              />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuItems;