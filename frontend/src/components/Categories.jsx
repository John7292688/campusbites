import { categories } from "../constants/homepageData";

function Categories() {
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
            <div className="category-card" key={category.id}>
              <div className="category-icon">
                {category.icon}
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