const statusColors = {
  Pending: {
    background: "#FEF3C7",
    color: "#92400E",
  },
  Preparing: {
    background: "#DBEAFE",
    color: "#1E40AF",
  },
  Ready: {
    background: "#DCFCE7",
    color: "#166534",
  },
  Delivered: {
    background: "#D1FAE5",
    color: "#065F46",
  },
  Cancelled: {
    background: "#FEE2E2",
    color: "#991B1B",
  },
};

const StatusBadge = ({ status }) => {
  const style =
    statusColors[status] || statusColors.Pending;

  return (
    <span
      style={{
        background: style.background,
        color: style.color,
        padding: "6px 14px",
        borderRadius: "999px",
        fontWeight: 600,
        fontSize: "14px",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;