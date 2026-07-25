import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { createMenuCategory } from "../../services/menuCategoryService";

const MenuCategoryDialog = ({
  open,
  onClose,
  onCategoryCreated,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createMenuCategory(name);

      setName("");

      if (onCategoryCreated) {
        await onCategoryCreated();
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Add Menu Category
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
          />
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
                size={20}
                color="inherit"
              />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MenuCategoryDialog;