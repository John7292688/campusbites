const statuses = [
  "Pending",
  "Preparing",
  "Ready",
  "Delivered",
];

function OrderTracker({ status }) {
  const currentIndex = statuses.indexOf(status);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {statuses.map((step, index) => {
        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div
            key={step}
            style={{
              flex: 1,
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                margin: "0 auto 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#fff",
                background: completed
                  ? "#16A34A"
                  : active
                  ? "#2563EB"
                  : "#D1D5DB",
              }}
            >
              {completed ? "✓" : index + 1}
            </div>

            <div
              style={{
                fontWeight: active ? "700" : "500",
              }}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderTracker;