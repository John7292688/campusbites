import "./../../styles/menuItemCard.css";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const MenuItemCard = ({
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="menu-item-card">
      <img
        src={item.image}
        alt={item.name}
        className="menu-item-image"
      />

      <div className="menu-item-content">
        <h3>{item.name}</h3>

        <p className="menu-item-price">
          ₦{Number(item.price).toLocaleString()}
        </p>

        <span
          className={`status ${
            item.is_available
              ? "available"
              : "unavailable"
          }`}
        >
          {item.is_available
            ? "Available"
            : "Unavailable"}
        </span>
      </div>

      <div className="menu-item-actions">
        <button
          className="edit-btn"
          onClick={onEdit}
        >
          <EditRoundedIcon />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          <DeleteRoundedIcon />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;