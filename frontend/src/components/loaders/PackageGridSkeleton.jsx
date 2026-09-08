function PackageGridSkeleton() {
  return (
    <div className="loading-grid">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="loading-card"
        >
          <div className="loading-image"></div>

          <div className="loading-content">
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
            <div className="loading-line"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PackageGridSkeleton;