function OrdersSkeleton() {
  return (
    <section className="orders-page">
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <div
          className="btn-spinner"
          style={{
            margin: "0 auto 20px",
          }}
        ></div>

        <h2>Loading your orders...</h2>
      </div>
    </section>
  );
}

export default OrdersSkeleton;