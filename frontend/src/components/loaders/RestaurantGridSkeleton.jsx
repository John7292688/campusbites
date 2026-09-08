import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

function RestaurantGridSkeleton() {
  return (
    <div className="restaurants-grid">
      {[...Array(6)].map((_, index) => (
        <RestaurantCardSkeleton
          key={index}
        />
      ))}
    </div>
  );
}

export default RestaurantGridSkeleton;