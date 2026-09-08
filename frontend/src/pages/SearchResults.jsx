import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getRestaurants } from "../services/restaurantService";
import { getPublicPackages } from "../services/comboPackageService";
import { useCart } from "../context/CartContext";
import "../styles/packages.css";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query =
    searchParams.get("q")?.toLowerCase() || "";

  const [restaurants, setRestaurants] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addItemToCart } = useCart();

  useEffect(() => {
    async function performSearch() {
      try {
        const [restaurantData, packageData] =
          await Promise.all([
            getRestaurants(),
            getPublicPackages(),
          ]);

        const filteredRestaurants =
          restaurantData.filter(
            (restaurant) =>
              restaurant.name
                ?.toLowerCase()
                .includes(query) ||
              restaurant.description
                ?.toLowerCase()
                .includes(query)
          );

        const filteredPackages =
          packageData.filter(
            (pkg) =>
              pkg.name
                ?.toLowerCase()
                .includes(query) ||
              pkg.description
                ?.toLowerCase()
                .includes(query) ||
              pkg.category_name
                ?.toLowerCase()
                .includes(query) ||
              pkg.restaurant_name
                ?.toLowerCase()
                .includes(query)
          );

        setRestaurants(filteredRestaurants);
        setPackages(filteredPackages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  const handleAddToCart = async (
    e,
    packageId
  ) => {
    e.stopPropagation();

    try {
      await addItemToCart({
        comboPackageId: packageId,
        quantity: 1,
      });

      alert("Package added to cart!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add package to cart."
      );
    }
  };

  if (loading) {
    return <p>Loading results...</p>;
  }

  return (
    <section className="container">
      <h1>
        Search Results for "{query}"
      </h1>

      <h2>Restaurants</h2>

      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <Link
              to={`/restaurants/${restaurant.id}`}
            >
              {restaurant.name}
            </Link>
          </div>
        ))
      )}

      <br />

      <h2>Packages</h2>

      {packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              className="public-package-card"
              key={pkg.id}
            >
              <img
                src={pkg.image}
                alt={pkg.name}
              />

              <div className="public-package-content">
                <h3>{pkg.name}</h3>

                <p>{pkg.description}</p>

                <p>
                  <strong>Restaurant:</strong>{" "}
                  {pkg.restaurant_name}
                </p>

                <h4>
                  ₦
                  {Number(
                    pkg.price
                  ).toLocaleString()}
                </h4>

                <button
                  onClick={(e) =>
                    handleAddToCart(
                      e,
                      pkg.id
                    )
                  }
                  style={{
                    marginTop: "12px",
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ff7a00",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchResults;