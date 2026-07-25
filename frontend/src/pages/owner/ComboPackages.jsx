import { useEffect, useState } from "react";
import { AddRounded } from "@mui/icons-material";

import PackageCard from "../../components/owner/PackageCard";
import AddPackageDialog from "../../components/owner/AddPackageDialog";

import { getAllPackages } from "../../services/packageService";

const ComboPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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
            onClick={() => setOpenDialog(true)}
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
              pkg={pkg}
            />
          ))
        )}
      </div>

      <AddPackageDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onPackageCreated={fetchPackages}
      />
    </>
  );
};

export default ComboPackages;