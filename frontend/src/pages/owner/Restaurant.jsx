import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ImageUploader from "../../components/ImageUploader";
import ownerApi from "../../services/ownerApi";

import "../../styles/restaurant.css";
import "../../styles/auth.css";

const Restaurant = () => {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
    image_url: "",
    logo_url: "",
  });

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await ownerApi.get(
        "/restaurants/my-restaurant"
      );

      console.log(response.data.restaurant);

      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load restaurant details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!restaurant.id) {
        await ownerApi.post(
          "/restaurants",
          restaurant
        );

        toast.success(
          "Restaurant created successfully."
        );

        fetchRestaurant();

        return;
      }

      await ownerApi.put(
        "/restaurants/my-restaurant",
        restaurant
      );

      toast.success(
        "Restaurant updated successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save restaurant."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading restaurant...</h2>;
  }

  return (
    <div className="restaurant-page">
      <div
        style={{
          background:
            restaurant.status === "approved"
              ? "#e8f9ee"
              : "#fff8e6",
          border:
            restaurant.status === "approved"
              ? "1px solid #22c55e"
              : "1px solid #f59e0b",
          padding: "15px 20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>
          {restaurant.status === "approved"
            ? "🟢 Restaurant Approved"
            : "🟡 Pending Approval"}
        </h3>

        <p>
          {restaurant.status === "approved"
            ? "Your restaurant is now visible to students."
            : "Your restaurant is under review and is not yet visible to students."}
        </p>
      </div>

      <h1>Restaurant Profile</h1>

      <div className="restaurant-grid">
        <div className="restaurant-card">
          <h2>Branding</h2>

          <ImageUploader
            label="Restaurant Cover"
            folder="restaurants/covers"
            value={restaurant.image_url}
            onUpload={(url) =>
              setRestaurant({
                ...restaurant,
                image_url: url,
              })
            }
          />

          <ImageUploader
            label="Restaurant Logo"
            folder="restaurants/logos"
            value={restaurant.logo_url}
            onUpload={(url) =>
              setRestaurant({
                ...restaurant,
                logo_url: url,
              })
            }
          />
        </div>

        <div className="restaurant-card">
          <h2>General Information</h2>

          <div className="restaurant-form">
            <label>Restaurant Name</label>

            <input
              name="name"
              value={restaurant.name}
              onChange={handleChange}
            />

            <label>Description</label>

            <textarea
              name="description"
              value={restaurant.description}
              onChange={handleChange}
            />

            <label>Phone Number</label>

            <input
              name="phone"
              value={restaurant.phone}
              onChange={handleChange}
            />

            <label>Location</label>

            <input
              name="location"
              value={restaurant.location}
              onChange={handleChange}
            />

            <button
              className="save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="btn-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;