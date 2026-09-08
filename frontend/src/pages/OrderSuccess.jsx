import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "50px 35px",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "550px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#DCFCE7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "42px",
            margin: "0 auto 25px",
          }}
        >
          ✅
        </div>

        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "15px",
            color: "#111827",
          }}
        >
          Order Placed Successfully!
        </h1>

        <p
          style={{
            color: "#6B7280",
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Thank you for ordering with CampusBites.
          Your restaurant has received your order and
          will begin processing it shortly.
        </p>

        <div
  style={{
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  <Link
    to="/my-orders"
    style={{
      minWidth: "180px",
      height: "50px",
      borderRadius: "10px",
      background: "#f97316",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Track My Order
  </Link>

  <Link
    to="/restaurants"
    style={{
      minWidth: "180px",
      height: "50px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      textDecoration: "none",
      color: "#111827",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      boxSizing: "border-box",
    }}
  >
    Order More Food
  </Link>
</div>
      </div>
    </section>
  );
}

export default OrderSuccess;