import { useEffect, useState } from "react";

import ImageUploader from "../../components/ImageUploader";
import ownerApi from "../../services/ownerApi";

import "../../styles/restaurant.css";

const Restaurant = () => {
  const [loading, setLoading] = useState(true);

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

      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error(error);
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
      await ownerApi.put(
        "/restaurants/my-restaurant",
        restaurant
      );

      alert("Restaurant updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update restaurant.");
    }
  };

  if (loading) {
    return <h2>Loading restaurant...</h2>;
  }

  return (
    <div className="restaurant-page">
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
                >
                Save Changes
                </button>

            </div>
            </div>

        </div>
</div>
  );
};

export default Restaurant;