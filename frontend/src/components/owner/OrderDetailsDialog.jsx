import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import StatusBadge from "../StatusBadge";

import {
  getRestaurantOrderItems,
  updateRestaurantOrderStatus,
} from "../../services/orderService";

const OrderDetailsDialog = ({
  open,
  onClose,
  order,
  onStatusUpdated,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);

  useEffect(() => {
      if (open && order) {
        setCurrentOrder(order);
        fetchItems();
      }
    }, [open, order]);

  const fetchItems = async () => {
  try {
    setLoading(true);

    const data =
      await getRestaurantOrderItems(order.id);

    console.log("ORDER ITEMS:", data);

    setItems(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleStatusUpdate = async (status) => {
  try {
    await updateRestaurantOrderStatus(
      order.id,
      status
    );

    // Refresh the Orders page
    await onStatusUpdated();

    // Update the dialog immediately
    setCurrentOrder((prev) => ({
      ...prev,
      status,
    }));
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update order status."
    );
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Order #{currentOrder?.id}
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div
              style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                }}
              >
                Customer
              </h3>

              <div
                style={{
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                👤 {currentOrder?.full_name}
              </div>

              <div
                style={{
                  color: "#6B7280",
                }}
              >
                📞 {currentOrder?.phone}
              </div>
            </div>

            <hr />

            <h3>Items</h3>

            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <div
                    key={item.id}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.menu_item_name && (
                      <>
                        <strong>{item.menu_item_name}</strong>

                        <div
                          style={{
                            color: "#666",
                            marginTop: "4px",
                          }}
                        >
                          Qty: {item.quantity}
                        </div>
                      </>
                    )}

                    {item.combo_package_name && (
                      <>
                        <strong>
                          Combo Package: {item.combo_package_name}
                        </strong>

                        <div
                          style={{
                            color: "#666",
                            marginTop: "4px",
                          }}
                        >
                          Qty: {item.quantity}
                        </div>
                      </>
                    )}

                    {item.custom_plate_id && (
                      <>
                        <strong>Custom Plate</strong>

                        <div
                          style={{
                            marginTop: "8px",
                            paddingLeft: "15px",
                          }}
                        >
                          {item.custom_plate_items?.map(
                            (plateItem, index) => (
                              <div key={index}>
                                • {plateItem.name} ×{" "}
                                {plateItem.quantity}
                              </div>
                            )
                          )}
                        </div>
                      </>
                    )}

                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                      }}
                    >
                      ₦{Number(item.price).toLocaleString()}
                    </div>
                  </div>

                  <div
                    style={{
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    Qty: {item.quantity}
                  </div>
                </div>

                <strong>
                  ₦{Number(item.price).toLocaleString()}
                </strong>
              </div>
            ))}

            <hr />

            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                borderRadius: "12px",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Total
              </span>

              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#16A34A",
                }}
              >
                ₦
                {Number(
                  currentOrder?.total_amount
                ).toLocaleString()}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <strong>Status:</strong>

              <StatusBadge status={currentOrder?.status} />
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions>

        {currentOrder?.status === "Pending" && (
            <>
            <Button
                variant="contained"
                color="primary"
                onClick={() =>
                handleStatusUpdate("Preparing")
                }
            >
                Accept Order
            </Button>

            <Button
                variant="outlined"
                color="error"
                onClick={() =>
                handleStatusUpdate("Cancelled")
                }
            >
                Reject
            </Button>
            </>
        )}

        {currentOrder?.status === "Preparing" && (
            <Button
            variant="contained"
            color="warning"
            onClick={() =>
                handleStatusUpdate("Ready")
            }
            >
            Mark Ready
            </Button>
        )}

        {currentOrder?.status === "Ready" && (
            <Button
            variant="contained"
            color="success"
            onClick={() =>
                handleStatusUpdate("Delivered")
            }
            >
            Mark Delivered
            </Button>
        )}

        <Button onClick={onClose}>
            Close
        </Button>

        </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;