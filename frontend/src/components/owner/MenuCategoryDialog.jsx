import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";

import {
  createMenuCategory,
  updateMenuCategory,
} from "../../services/menuCategoryService";

const MenuCategoryDialog = ({
  open,
  mode,
  selectedCategory,
  onClose,
  onCategoryCreated,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      mode === "edit" &&
      selectedCategory
    ) {
      setName(selectedCategory.name);
    } else {
      setName("");
    }
  }, [mode, selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "create") {
        await createMenuCategory(name);

        toast.success(
          "Category created successfully!"
        );
      } else {
        await updateMenuCategory(
          selectedCategory.id,
          name
        );

        toast.success(
          "Category updated successfully!"
        );
      }

      setName("");

      if (onCategoryCreated) {
        await onCategoryCreated();
      }

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          `Failed to ${
            mode === "create"
              ? "create"
              : "update"
          } category.`
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
      maxWidth="xs"
    >
      <DialogTitle>
        {mode === "create"
          ? "Add Menu Category"
          : "Edit Menu Category"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            label="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            disabled={loading}
          />
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
                size={20}
                color="inherit"
              />
            ) : mode === "create" ? (
              "Save Category"
            ) : (
              "Update Category"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MenuCategoryDialog;