import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getRestaurants } from "../services/restaurantService";
import { getPublicPackages } from "../services/comboPackageService";
import RestaurantCardSkeleton from "./loaders/RestaurantCardSkeleton";
import RestaurantGridSkeleton from "../components/loaders/RestaurantGridSkeleton";

function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [comboPackages, setComboPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const searchTerm =
    searchParams.get("search")?.toLowerCase() || "";

console.log("SEARCH TERM:", searchTerm);
console.log("RESTAURANTS COUNT:", restaurants.length);
    const filteredRestaurants = restaurants.filter(
      (restaurant) => {
        const restaurantMatch =
          restaurant.name
            ?.toLowerCase()
            .includes(searchTerm) ||
          restaurant.description
            ?.toLowerCase()
            .includes(searchTerm) ||
          restaurant.location
            ?.toLowerCase()
            .includes(searchTerm);

        const comboMatch = comboPackages.some(
          (combo) =>
            combo.restaurant_id === restaurant.id &&
            (
              combo.name
                ?.toLowerCase()
                .includes(searchTerm) ||
              combo.description
                ?.toLowerCase()
                .includes(searchTerm) ||
              combo.items_included
                ?.toLowerCase()
                .includes(searchTerm)
            )
        );

        return restaurantMatch || comboMatch;
      }
    );

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const [restaurantsData, comboData] =
        await Promise.all([
          getRestaurants(),
          getPublicPackages(),
        ]);

        console.log("RESTAURANTS:", restaurantsData);
        console.log("PACKAGES:", comboData);

        setRestaurants(restaurantsData);
        setComboPackages(comboData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  if (loading) {
  return (
    <section className="all-restaurants">
      <div className="container">
        <RestaurantGridSkeleton />
      </div>
    </section>
  );
}

  if (!loading && filteredRestaurants.length === 0) {
    return (
      <p>
        No restaurants found
        {searchTerm && ` for "${searchTerm}"`}
      </p>
    );
  }

  console.log(
  "FILTERED RESTAURANTS:",
  filteredRestaurants
);

  return (
    <section className="all-restaurants">
      <div className="container">

        {searchTerm && (
          <div className="search-results-info">
            Showing {filteredRestaurants.length}
            {" "}
            result{filteredRestaurants.length !== 1 ? "s" : ""}
            {" "}
            for "{searchTerm}"
          </div>
        )}

        <div className="restaurants-grid">
          {filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="restaurant-card"
              key={restaurant.id}
            >
              <img
                src={
                  restaurant.image_url ||
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                }
                alt={restaurant.name}
              />

              <div className="restaurant-content">
                <h3>{restaurant.name}</h3>

                <p className="restaurant-location">
                  📍 {restaurant.location}
                </p>

                <p className="restaurant-description">
                  {restaurant.description}
                </p>

                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className="view-menu-btn"
                >
                  View Menu
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllRestaurants;