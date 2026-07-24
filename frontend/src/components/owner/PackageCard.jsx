import {
  EditRounded,
  DeleteRounded,
  CheckCircleRounded,
  CancelRounded,
} from "@mui/icons-material";
import "../../styles/packageCard.css";

const PackageCard = ({ pkg }) => {
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
      </div>

      <div className="package-actions">
        <button className="edit-btn">
          <EditRounded />
          Edit
        </button>

        <button className="delete-btn">
          <DeleteRounded />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PackageCard;