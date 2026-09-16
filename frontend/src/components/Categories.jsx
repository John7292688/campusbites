import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/package-categories`
      );

      setCategories(response.data.categories || []);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  const getCategoryIcon = (name) => {
    const icons = {
      "Fast Food": "🍔",
      Pizza: "🍕",
      Chicken: "🍗",
      Drinks: "🥤",
      "Local Meals": "🍚",
      Desserts: "🍰",
    };

    return icons[name] || "🍽️";
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Browse Categories</h2>

          <p>
            Choose your favourite meals from popular food categories.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div
              className="category-card"
              key={category.id}
            >
              <div className="category-icon">
                {getCategoryIcon(category.name)}
              </div>

              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;