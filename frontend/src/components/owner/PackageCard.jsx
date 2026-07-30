import {
  EditRounded,
  DeleteRounded,
  CheckCircleRounded,
  CancelRounded,
} from "@mui/icons-material";

import { Switch } from "@mui/material";
import "../../styles/packageCard.css";

const PackageCard = ({
  pkg,
  onEdit,
  onDelete,
  onToggleAvailability,
}) => {
  return (
    <div className="package-card">
      <img
        src={pkg.image}
        alt={pkg.name}
        className="package-image"
      />

      <div className="package-content">
        <h3>{pkg.name}</h3>

        <p className="package-price">
          ₦{Number(pkg.price).toLocaleString()}
        </p>

        <span
          className={`status ${
            pkg.is_available ? "available" : "unavailable"
          }`}
        >
          {pkg.is_available ? (
            <>
              <CheckCircleRounded fontSize="small" />
              Available
            </>
          ) : (
            <>
              <CancelRounded fontSize="small" />
              Unavailable
            </>
          )}
        </span>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Switch
            checked={pkg.is_available}
            onChange={() => onToggleAvailability(pkg)}
            color="warning"
          />

          <span
            style={{
              fontWeight: 600,
              color: pkg.is_available
                ? "#16a34a"
                : "#dc2626",
            }}
          >
            {pkg.is_available
              ? "Available"
              : "Unavailable"}
          </span>
        </div>
      </div>

      <div className="package-actions">
        <button
          className="edit-btn"
          onClick={onEdit}
        >
          <EditRounded />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          <DeleteRounded />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PackageCard;