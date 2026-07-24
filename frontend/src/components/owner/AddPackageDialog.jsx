import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Student Special",
  "Family Combo",
];

const AddPackageDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    items_included: "",
    is_available: true,
    image: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // We'll connect this to the backend next.
    console.log(formData);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Combo Package</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Package Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                >
                  {category}
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
            />

            <TextField
              label="Items Included"
              name="items_included"
              value={formData.items_included}
              onChange={handleChange}
              multiline
              rows={3}
              helperText="Separate items with commas."
            />

            <Button
              variant="outlined"
              component="label"
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {formData.image && (
              <p>{formData.image.name}</p>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            Save Package
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPackageDialog;