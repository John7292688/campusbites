import "../../styles/skeleton.css";

function RestaurantCardSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        border: "1px solid #E2E8F0",
      }}
    >
      <div
        className="skeleton"
        style={{
            width: "100%",
            height: "220px",
            marginBottom: "16px",
            borderRadius: "12px",
        }}
      />

      <div
        className="skeleton"
        style={{
            width: "65%",
            height: "22px",
            marginBottom: "12px",
        }}
        />

      <div
        className="skeleton"
        style={{
            width: "40%",
            height: "16px",
            marginBottom: "16px",
        }}
        />

      <div
        className="skeleton"
        style={{
            width: "120px",
            height: "42px",
            borderRadius: "8px",
        }}
        />
    </div>
  );
}

export default RestaurantCardSkeleton;