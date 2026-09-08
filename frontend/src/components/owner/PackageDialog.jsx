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
import { toast } from "react-toastify";

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

  const [currentImage, setCurrentImage] =
    useState("");

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

    if (
      mode === "edit" &&
      selectedPackage
    ) {
      setFormData({
        name: selectedPackage.name || "",
        categoryId:
          selectedPackage.category_id || "",
        price:
          selectedPackage.price || "",
        description:
          selectedPackage.description || "",
        itemsIncluded:
          selectedPackage.items_included ||
          "",
        image: null,
        isAvailable:
          selectedPackage.is_available,
      });

      setCurrentImage(
        selectedPackage.image || ""
      );
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
      const response =
        await getAllCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load categories."
      );
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

    if (loading) return;

    try {
      setLoading(true);

      const data = new FormData();

      data.append(
        "categoryId",
        formData.categoryId
      );

      data.append(
        "name",
        formData.name
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "itemsIncluded",
        formData.itemsIncluded
      );

      data.append(
        "isAvailable",
        formData.isAvailable
      );

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      if (mode === "create") {
        await createPackage(data);

        toast.success(
          "Package created successfully."
        );
      } else {
        await updatePackage(
          selectedPackage.id,
          data
        );

        toast.success(
          "Package updated successfully."
        );
      }

      if (onPackageCreated) {
        await onPackageCreated();
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
          } package.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
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
              disabled={loading}
            />

            <TextField
              select
              label="Category"
              name="categoryId"
              value={formData.categoryId}
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              disabled={loading}
            />

            <TextField
              label="Items Included"
              name="itemsIncluded"
              value={
                formData.itemsIncluded
              }
              onChange={handleChange}
              multiline
              rows={3}
              helperText="Separate items with commas."
              disabled={loading}
            />

            {mode === "edit" &&
              currentImage && (
                <div>
                  <p
                    style={{
                      marginBottom:
                        "8px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Current Image
                  </p>

                  <img
                    src={currentImage}
                    alt="Package"
                    style={{
                      width: "100%",
                      maxHeight:
                        "220px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "8px",
                    }}
                  />
                </div>
              )}

            <Button
              variant="outlined"
              component="label"
              disabled={loading}
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />
            </Button>

            {formData.image && (
              <p>
                Selected:
                {" "}
                {formData.image.name}
              </p>
            )}
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
            startIcon={
              loading ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : null
            }
          >
            {loading
              ? mode === "create"
                ? "Saving..."
                : "Updating..."
              : mode === "create"
              ? "Save Package"
              : "Update Package"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PackageDialog;