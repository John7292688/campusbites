import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getPublicPackages } from "../services/comboPackageService";
import "../styles/featuredPackages.css";
import { toast } from "react-toastify";

function FeaturedPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data =
          await getPublicPackages();

        console.log(
          "PACKAGES:",
          data
        );

        setPackages(
          Array.isArray(data)
            ? data.slice(0, 6)
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const handleAddToCart = async (
    e,
    pkg
  ) => {
    e.stopPropagation();

    // Show instantly
    toast.success("Added to cart!", {
      position: "top-right",
    });

    try {
      await addItemToCart({
        comboPackageId: pkg.id,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <section className="featured-packages">
        <div className="container">
          <div className="section-header">
            <h2>
              Popular Packages
            </h2>

            <p>
              Loading packages...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="featured-packages">
      <div className="container">

        <div className="section-header">
          <h2>
            Popular Packages
          </h2>

          <p>
            Discover the most
            popular meal deals
            available on
            CampusBites.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              className="featured-package-card"
              key={pkg.id}
              onClick={() =>
                navigate(
                  `/restaurants/${pkg.restaurant_id}`
                )
              }
            >
              <img
                src={
                  pkg.image ||
                  pkg.image_url ||
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                }
                alt={pkg.name}
              />

              <div className="featured-package-content">
                <h3>{pkg.name}</h3>

                <p className="featured-package-description">
                  {pkg.description}
                </p>

                <span className="package-restaurant">
                  🍽 {pkg.restaurant_name}
                </span>

                <p className="featured-package-price">
                  ₦{Number(pkg.price).toLocaleString()}
                </p>

                <button
                  className="featured-package-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, pkg);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="packages-footer">
          <Link
            to="/packages"
            className="view-all-packages-btn"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedPackages;