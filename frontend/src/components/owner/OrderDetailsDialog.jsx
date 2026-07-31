import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (open && order) {
      fetchItems();
    }
  }, [open, order]);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const data =
        await getRestaurantOrderItems(order.id);

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

    await onStatusUpdated();

    onClose();
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
        Order #{order?.id}
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <h3>Customer</h3>

            <p>
              <strong>Name:</strong>{" "}
              {order?.full_name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order?.phone}
            </p>

            <hr />

            <h3>Items</h3>

            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "15px",
                }}
              >
                <strong>
                  {item.menu_item_name ||
                    item.combo_package_name ||
                    item.custom_plate_name}
                </strong>

                <br />

                Qty: {item.quantity}

                <br />

                ₦
                {Number(item.price).toLocaleString()}
              </div>
            ))}

            <hr />

            <h3>
              Total: ₦
              {Number(
                order?.total_amount
              ).toLocaleString()}
            </h3>

            <p>
              Status: {order?.status}
            </p>
          </>
        )}
      </DialogContent>

      <DialogActions>

        {order?.status === "Pending" && (
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

        {order?.status === "Preparing" && (
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

        {order?.status === "Ready" && (
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