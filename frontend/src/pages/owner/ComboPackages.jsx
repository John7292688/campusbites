import { useEffect, useState } from "react";
import { AddRounded } from "@mui/icons-material";

import PackageCard from "../../components/owner/PackageCard";
import PackageDialog from "../../components/owner/PackageDialog";

import {
  getAllPackages,
  updatePackage,
} from "../../services/packageService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deletePackage } from "../../services/packageService";

const ComboPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await getAllPackages();
      setPackages(response.data || []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading packages...</h2>;
  }

  const handleAddPackage = () => {
  setDialogMode("create");
  setSelectedPackage(null);
  setOpenDialog(true);
};

const handleEditPackage = (pkg) => {
  setDialogMode("edit");
  setSelectedPackage(pkg);
  setOpenDialog(true);
};

const handleDeletePackage = async () => {
  try {
    await deletePackage(packageToDelete.id);

    setDeleteDialogOpen(false);
    setPackageToDelete(null);

    await fetchPackages();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to delete package."
    );
  }
};

const handleToggleAvailability = async (pkg) => {
  // Save previous state for rollback
  const previousPackages = [...packages];

  // Optimistic UI update
  setPackages((prev) =>
    prev.map((item) =>
      item.id === pkg.id
        ? {
            ...item,
            is_available: !item.is_available,
          }
        : item
    )
  );

  try {
    await updatePackage(pkg.id, {
      categoryId: pkg.category_id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image,
      itemsIncluded: pkg.items_included,
      isAvailable: !pkg.is_available,
    });
  } catch (error) {
    // Roll back if the update fails
    setPackages(previousPackages);

    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to update package."
    );
  }
};

  return (
    <>
      <div className="packages-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "5px" }}>
              Combo Packages
            </h1>

            <p style={{ color: "#6b7280" }}>
              Manage your restaurant's combo packages
            </p>
          </div>

          <button
            onClick={handleAddPackage}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <AddRounded />
            Add Package
          </button>
        </div>

        {packages.length === 0 ? (
          <h3>No packages found.</h3>
        ) : (
          packages.map((pkg) => (
            <PackageCard
              pkg={pkg}
              onEdit={() => handleEditPackage(pkg)}
              onDelete={() => handleDeleteClick(pkg)}
              onToggleAvailability={handleToggleAvailability}
            />
          ))
        )}
      </div>

      <PackageDialog
        mode={dialogMode}
        selectedPackage={selectedPackage}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onPackageCreated={fetchPackages}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          Delete Package
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>
            {packageToDelete?.name}
          </strong>
          ?
          <br />
          <br />
          This action cannot be undone.
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeletePackage}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default ComboPackages;