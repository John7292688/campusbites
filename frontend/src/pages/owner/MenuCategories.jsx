import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { toast } from "react-toastify";

import {
  getAllMenuCategories,
  deleteMenuCategory,
} from "../../services/menuCategoryService";

import MenuCategoryDialog from "../../components/owner/MenuCategoryDialog";

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogMode, setDialogMode] = useState("create");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [categoryToDelete, setCategoryToDelete] =
    useState(null);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response =
        await getAllMenuCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    setDialogMode("edit");
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCategoryConfirm =
    async () => {
      try {
        setDeleting(true);

        await deleteMenuCategory(
          categoryToDelete.id
        );

        toast.success(
          "Category deleted successfully."
        );

        setDeleteDialogOpen(false);
        setCategoryToDelete(null);

        await fetchCategories();
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to delete category."
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
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
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            Menu Categories
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Manage your Build Your Plate
            categories.
          </p>
        </div>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            setDialogMode("create");
            setSelectedCategory(null);
            setOpenDialog(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#6b7280",
          }}
        >
          <h2>No categories yet</h2>

          <p>
            Click <strong>Add Category</strong>{" "}
            to create your first menu
            category.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                background: "#fff",
                padding: "18px 24px",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",

                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <LocalOfferRoundedIcon
                  sx={{
                    color: "#f59e0b",
                  }}
                />

                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {category.name}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    {category.menu_count} menu
                    item
                    {Number(
                      category.menu_count
                    ) !== 1
                      ? "s"
                      : ""}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    handleEditCategory(
                      category
                    )
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  disabled={
                    Number(
                      category.menu_count
                    ) > 0
                  }
                  onClick={() =>
                    handleDeleteCategory(
                      category
                    )
                  }
                >
                  {Number(
                    category.menu_count
                  ) > 0
                    ? `Used (${category.menu_count})`
                    : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <MenuCategoryDialog
        open={openDialog}
        mode={dialogMode}
        selectedCategory={
          selectedCategory
        }
        onClose={() => {
          setOpenDialog(false);
          setSelectedCategory(null);
          setDialogMode("create");
        }}
        onCategoryCreated={
          fetchCategories
        }
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() =>
          !deleting &&
          setDeleteDialogOpen(false)
        }
      >
        <DialogTitle>
          Delete Category
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>
            {categoryToDelete?.name}
          </strong>
          ?
          <br />
          <br />
          This action cannot be undone.
        </DialogContent>

        <DialogActions>
          <Button
            disabled={deleting}
            onClick={() =>
              setDeleteDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            disabled={deleting}
            onClick={
              handleDeleteCategoryConfirm
            }
          >
            {deleting ? (
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

export default MenuCategories;