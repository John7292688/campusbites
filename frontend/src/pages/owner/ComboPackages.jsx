import { useEffect, useState } from "react";
import { AddRounded } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

import PackageCard from "../../components/owner/PackageCard";
import PackageDialog from "../../components/owner/PackageDialog";

import {
  getAllPackages,
  updatePackage,
  deletePackage,
} from "../../services/packageService";

const ComboPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedPackage, setSelectedPackage] =
    useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [packageToDelete, setPackageToDelete] =
    useState(null);

  const [deleting, setDeleting] = useState(false);

  const [updatingPackageId, setUpdatingPackageId] =
    useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const response = await getAllPackages();

      setPackages(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch packages."
      );
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setDeleteDialogOpen(true);
  };

  const handleDeletePackage = async () => {
    try {
      setDeleting(true);

      await deletePackage(packageToDelete.id);

      toast.success(
        "Package deleted successfully."
      );

      setDeleteDialogOpen(false);
      setPackageToDelete(null);

      await fetchPackages();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete package."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleAvailability = async (
    pkg
  ) => {
    const previousPackages = [...packages];

    setUpdatingPackageId(pkg.id);

    setPackages((prev) =>
      prev.map((item) =>
        item.id === pkg.id
          ? {
              ...item,
              is_available:
                !item.is_available,
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

      toast.success(
        `Package ${
          !pkg.is_available
            ? "enabled"
            : "disabled"
        } successfully.`
      );
    } catch (error) {
      setPackages(previousPackages);

      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update package."
      );
    } finally {
      setUpdatingPackageId(null);
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
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <CircularProgress />

        <h3>Loading packages...</h3>
      </div>
    );
  }

  return (
    <>
      <div className="packages-page">
        <div className="packages-header">
          <div>
            <h1
              style={{
                marginBottom: "5px",
              }}
            >
              Combo Packages
            </h1>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              Manage your restaurant's
              combo packages
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
              key={pkg.id}
              pkg={{
                ...pkg,
                isUpdating:
                  updatingPackageId ===
                  pkg.id,
              }}
              onEdit={() =>
                handleEditPackage(pkg)
              }
              onDelete={() =>
                handleDeleteClick(pkg)
              }
              onToggleAvailability={() =>
                handleToggleAvailability(
                  pkg
                )
              }
            />
          ))
        )}
      </div>

      <PackageDialog
        mode={dialogMode}
        selectedPackage={selectedPackage}
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        onPackageCreated={fetchPackages}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() =>
          !deleting &&
          setDeleteDialogOpen(false)
        }
      >
        <DialogTitle>
          Delete Package
        </DialogTitle>

        <DialogContent>
          Are you sure you want to
          delete{" "}
          <strong>
            {packageToDelete?.name}
          </strong>
          ?
          <br />
          <br />
          This action cannot be
          undone.
        </DialogContent>

        <DialogActions>
          <Button
            disabled={deleting}
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
            disabled={deleting}
            onClick={
              handleDeletePackage
            }
            startIcon={
              deleting ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : null
            }
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComboPackages;