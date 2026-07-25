import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";

import { getAllCategories } from "../../services/categoryService";
import {
  createPackage,
  updatePackage,
} from "../../services/packageService";

const PackageDialog = ({
  mode = "create",
  selectedPackage = null,
  open,
  onClose,
  onPackageCreated,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    itemsIncluded: "",
    image: null,
    isAvailable: true,
  });


useEffect(() => {
  if (!open) return;

  fetchCategories();

  if (mode === "edit" && selectedPackage) {
    setFormData({
      name: selectedPackage.name || "",
      categoryId: selectedPackage.category_id || "",
      price: selectedPackage.price || "",
      description: selectedPackage.description || "",
      itemsIncluded: selectedPackage.items_included || "",
      image: null,
      isAvailable: selectedPackage.is_available,
    });

    setCurrentImage(selectedPackage.image || "");
  } else {
    setFormData({
      name: "",
      categoryId: "",
      price: "",
      description: "",
      itemsIncluded: "",
      image: null,
      isAvailable: true,
    });

    setCurrentImage("");
  }
}, [open, mode, selectedPackage]);

const fetchCategories = async () => {
  try {
    const response = await getAllCategories();
    setCategories(response.data);
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

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

  console.log("Mode:", mode);
  console.log("Selected Package:", selectedPackage);

  try {
    setLoading(true);

    const data = new FormData();

    data.append("categoryId", formData.categoryId);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("itemsIncluded", formData.itemsIncluded);
    data.append("isAvailable", formData.isAvailable);

    // Only send a new image if one was selected
    if (formData.image) {
      data.append("image", formData.image);
    }

    if (mode === "create") {
      await createPackage(data);
    } else {
      await updatePackage(selectedPackage.id, data);
    }

    if (onPackageCreated) {
      await onPackageCreated();
    }

    onClose();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        `Failed to ${
          mode === "create" ? "create" : "update"
        } package.`
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
      maxWidth="sm"
    >
      <DialogTitle>
        {mode === "create"
          ? "Add Combo Package"
          : "Edit Combo Package"}
      </DialogTitle>

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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
            />

            <TextField
              label="Items Included"
              name="itemsIncluded"
              value={formData.itemsIncluded}
              onChange={handleChange}
              multiline
              rows={3}
              helperText="Separate items with commas."
            />

            {mode === "edit" && currentImage && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  Current Image
                </p>

                <img
                  src={currentImage}
                  alt="Package"
                  style={{
                    width: "100%",
                    maxHeight: "220px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}

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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              mode === "create"
                ? "Save Package"
                : "Update Package"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PackageDialog;