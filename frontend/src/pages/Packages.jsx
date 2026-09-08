import { useEffect, useState } from "react";
import { getPublicPackages } from "../services/comboPackageService";
import { useCart } from "../context/CartContext";
import "../styles/packages.css";
import { toast } from "react-toastify";
import PackageGridSkeleton from "../components/loaders/PackageGridSkeleton";
import { useNavigate } from "react-router-dom";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const { addItemToCart } = useCart();
  
  const navigate = useNavigate();

  const categories = [
    "all",
    ...new Set(
      packages.map(
        (pkg) => pkg.category_name
      )
    ),
  ];

  const filteredPackages =
    selectedCategory === "all"
      ? packages
      : packages.filter(
          (pkg) =>
            pkg.category_name ===
            selectedCategory
        );

  const groupedPackages = filteredPackages.reduce(
    (groups, pkg) => {
      const category = pkg.category_name;

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(pkg);

      return groups;
    },
    {}
  );

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getPublicPackages();
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  if (loading) {
  return (
    <section className="packages-page">
      <div className="container">
        <PackageGridSkeleton />
      </div>
    </section>
  );
}

  const handleAddToCart = async (
    e,
    packageId
  ) => {
    e.stopPropagation();

    // Show instantly
    toast.success("Added to cart!");

    try {
      await addItemToCart({
        comboPackageId: packageId,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add package to cart."
      );
    }
  };

  return (
    <section className="packages-page">
      <div className="container">
        <h1>Combo Packages</h1>

        <p>
          Discover affordable meal packages from all
          restaurants.
        </p>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category === "all"
                ? "All"
                : category}
            </button>
          ))}
        </div>

        {Object.entries(groupedPackages).map(
          ([category, categoryPackages]) => (
            <div
              className="category-section"
              key={category}
            >
              <h2 className="category-heading">
                {category}
              </h2>

              <div className="packages-grid">
                {categoryPackages.map((pkg) => (
                  <div
                    className="public-package-card"
                    key={pkg.id}
                    onClick={() =>
                      navigate(`/restaurants/${pkg.restaurant_id}`)
                    }
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                    />

                    <div className="public-package-content">
                      <h3>{pkg.name}</h3>

                      <p>{pkg.description}</p>

                      <div className="package-restaurant">
                        🍽 {pkg.restaurant_name}
                      </div>

                      {pkg.is_available && (
                        <span className="package-status">
                          Available
                        </span>
                      )}

                      <h4>
                        ₦
                        {Number(
                          pkg.price
                        ).toLocaleString()}
                      </h4>

                      <button
                        className="package-cart-btn"
                        onClick={(e) =>
                          handleAddToCart(e, pkg.id)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Packages;