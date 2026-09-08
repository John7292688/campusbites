import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { getRestaurantOrders } from "../../services/orderService";
import OrderDetailsDialog from "../../components/owner/OrderDetailsDialog";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getRestaurantOrders();

      console.log("FETCH ORDERS:");
      console.log(data[0]);

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const handleViewDetails = (order) => {
  console.log(
    "SELECTED RECEIPT:",
    order.receipt_number
  );

  setSelectedOrder(order);
  setDialogOpen(true);
};

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "16px",
              marginBottom: "20px",
              boxShadow:
                "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2>Order #{order.id}</h2>

              <span
                style={{
                  background:
                    order.status === "Pending"
                      ? "#FEF3C7"
                      : order.status ===
                        "Preparing"
                      ? "#DBEAFE"
                      : order.status === "Ready"
                      ? "#DCFCE7"
                      : "#E5E7EB",
                  color: "#111827",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontWeight: "600",
                }}
              >
                {order.status}
              </span>
            </div>

            <p>
              <strong>Customer:</strong>{" "}
              {order.full_name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>

            <p>
              <strong>Total:</strong> ₦
              {Number(
                order.total_amount
              ).toLocaleString()}
            </p>

            <p>
              <strong>Ordered:</strong>{" "}
              {new Date(
                order.created_at
              ).toLocaleString()}
            </p>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() =>
                handleViewDetails(order)
              }
            >
              View Details
            </Button>
          </div>
        ))
      )}

      <OrderDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        order={selectedOrder}
        onStatusUpdated={fetchOrders}
      />
    </div>
  );
};

export default Orders;