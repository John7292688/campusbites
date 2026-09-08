import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getDeliveryLocations,
  createDeliveryLocation,
  updateDeliveryLocation,
  deleteDeliveryLocation,
} from "../../services/adminDeliveryLocationService";

import "../../styles/adminDeliveryLocations.css";

function DeliveryLocations() {
  const [locations, setLocations] =
    useState([]);

  const [locationName, setLocationName] =
    useState("");

  const [deliveryFee, setDeliveryFee] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadLocations = async () => {
    try {
      const data =
        await getDeliveryLocations();

      setLocations(data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load locations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

const handleAddLocation = async () => {
  try {
    if (!locationName.trim()) {
      toast.error(
        "Please enter a location name"
      );
      return;
    }

    if (!deliveryFee) {
      toast.error(
        "Please enter a delivery fee"
      );
      return;
    }

    if (editingId) {
      const response =
        await updateDeliveryLocation(
          editingId,
          locationName,
          deliveryFee
        );

      setLocations((prev) =>
        prev.map((location) =>
          location.id === editingId
            ? response.data
            : location
        )
      );

      toast.success(
        "Location updated successfully"
      );
    } else {
      const response =
        await createDeliveryLocation(
          locationName,
          deliveryFee
        );

      setLocations((prev) => [
        response.data,
        ...prev,
      ]);

      toast.success(
        "Location added successfully"
      );
    }

    setLocationName("");
    setDeliveryFee("");
    setEditingId(null);
  } catch (error) {
    toast.error(
      error.message ||
        "Operation failed"
    );
  }
};

  const handleEdit = (location) => {
    setEditingId(location.id);

    setLocationName(
      location.location_name
    );

    setDeliveryFee(
      location.delivery_fee
    );
  };

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Delete this delivery location?"
  );

  if (!confirmed) {
    return;
  }

  const previousLocations =
    locations;

  setLocations((prev) =>
    prev.filter(
      (location) => location.id !== id
    )
  );

  try {
    await deleteDeliveryLocation(id);

    toast.success(
      "Location deleted successfully"
    );
  } catch (error) {
    setLocations(previousLocations);

    toast.error(
      error.message ||
        "Failed to delete location"
    );
  }
};

  const handleCancelEdit = () => {
    setEditingId(null);
    setLocationName("");
    setDeliveryFee("");
  };

  return (
    <div className="delivery-locations-page">
      <h1>Delivery Locations</h1>

      <p>
        Manage delivery locations and fees.
      </p>

      {editingId && (
        <div className="editing-banner">
          Editing Location
        </div>
      )}

      <div className="location-form">
        <input
          type="text"
          placeholder="Location Name"
          value={locationName}
          onChange={(e) =>
            setLocationName(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Delivery Fee"
          value={deliveryFee}
          onChange={(e) =>
            setDeliveryFee(
              e.target.value
            )
          }
        />

        <button
          onClick={handleAddLocation}
        >
          {editingId
            ? "Update Location"
            : "Add Location"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="locations-table-wrapper">
          <table className="locations-table">
            <thead>
              <tr>
                <th>Location</th>

                <th>Delivery Fee</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {locations.map(
                (location) => (
                  <tr
                    key={location.id}
                  >
                    <td>
                      {
                        location.location_name
                      }
                    </td>

                    <td>
                      ₦
                      {Number(
                        location.delivery_fee
                      ).toLocaleString()}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              location
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              location.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeliveryLocations;