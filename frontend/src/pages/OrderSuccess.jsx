import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1>🎉 Order Placed Successfully!</h1>

        <p style={{ margin: "20px 0" }}>
          Thank you for ordering with CampusBites.
          Your restaurant has received your order.
        </p>

        <Link
          to="/"
          className="view-menu-btn"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;