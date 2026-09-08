function RestaurantDetailsSkeleton() {
  return (
    <section className="restaurant-details">
      <div className="restaurant-loading">
        <div className="restaurant-loading-image"></div>

        <div className="restaurant-loading-content">
          <div className="restaurant-loading-title"></div>

          <div className="restaurant-loading-line"></div>
          <div className="restaurant-loading-line short"></div>

          <div className="restaurant-loading-line"></div>
        </div>

        <div className="restaurant-loading-layout">

          <div className="restaurant-loading-combos">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="restaurant-loading-card"
              >
                <div className="restaurant-loading-card-image"></div>

                <div className="restaurant-loading-card-content">
                  <div className="restaurant-loading-line"></div>
                  <div className="restaurant-loading-line short"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="restaurant-loading-menu">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="restaurant-loading-menu-row"
              >
                <div className="restaurant-loading-line"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default RestaurantDetailsSkeleton;