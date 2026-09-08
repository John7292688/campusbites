import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { jsPDF } from "jspdf";
import logo from "/images/neatcampusbitelogo.png";

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
    console.log(
      "DIALOG ORDER:",
      order
    );

    setCurrentOrder(order);
    fetchItems();
  }
}, [open, order]);

    console.log(currentOrder);

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

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  let y = 20;

  const img = new Image();
  img.src = logo;

  img.onload = () => {
    const receiptNumber =
      currentOrder?.receipt_number ||
      `CB-${currentOrder?.id}`;

    // =========================
    // LOGO
    // =========================

    doc.addImage(
      img,
      "PNG",
      pageWidth / 2 - 18,
      10,
      36,
      24
    );

    y = 42;

    // =========================
    // CAMPUSBITES TITLE
    // =========================

    doc.setFontSize(24);
    doc.setFont(undefined, "bold");

    doc.setFontSize(24);
    doc.setFont(undefined, "bold");

    const campusWidth = doc.getTextWidth("Campus");
    const bitesWidth = doc.getTextWidth("Bites");

    const totalWidth = campusWidth + bitesWidth;

    const startX = (pageWidth - totalWidth) / 2;

    doc.setTextColor(31, 41, 55);
    doc.text("Campus", startX, y);

    doc.setTextColor(249, 115, 22);
    doc.text(
      "Bites",
      startX + campusWidth,
      y
    );

    y += 8;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");

    doc.setTextColor(107, 114, 128);

    doc.text(
      "Official Food Order Receipt",
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    y += 8;

    // =========================
    // RESTAURANT NAME
    // =========================

    doc.setFontSize(11);

    doc.setTextColor(249, 115, 22);

    doc.text(
      currentOrder?.restaurant_name ||
        "CampusBites Partner Restaurant",
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    y += 6;

    doc.setFontSize(9);

    doc.setTextColor(107, 114, 128);

    doc.text(
      `Address: ${
        currentOrder?.restaurant_address || "N/A"
      }`,
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    y += 8;

    // Divider

    doc.setDrawColor(249, 115, 22);
    doc.setLineWidth(0.7);

    doc.line(20, y, 190, y);

    y += 10;

    // =========================
    // ORDER INFORMATION
    // =========================

    doc.setFillColor(255, 247, 237);

    doc.roundedRect(
      15,
      y,
      180,
      28,
      3,
      3,
      "F"
    );

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    doc.setTextColor(31, 41, 55);

    doc.text(
      "ORDER INFORMATION",
      20,
      y + 8
    );

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text(
      `Receipt No: ${receiptNumber}`,
      20,
      y + 18
    );

    doc.text(
      `Order ID: #${currentOrder?.id}`,
      110,
      y + 18
    );

    doc.text(
      `Status: ${currentOrder?.status}`,
      20,
      y + 24
    );

    doc.text(
      new Date(
        currentOrder?.created_at
      ).toLocaleString(),
      110,
      y + 24
    );

    y += 40;

    // =========================
    // CUSTOMER
    // =========================

    doc.setFillColor(
      248,
      250,
      252
    );

    doc.roundedRect(
      15,
      y,
      180,
      24,
      3,
      3,
      "F"
    );

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    doc.text("CUSTOMER", 20, y + 8);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text(
      `Name: ${currentOrder?.full_name}`,
      20,
      y + 18
    );

    doc.text(
      `Phone: ${currentOrder?.phone}`,
      110,
      y + 18
    );

    y += 34;

    // =========================
    // DELIVERY
    // =========================

    const addressLines =
      doc.splitTextToSize(
        currentOrder?.delivery_address ||
          "N/A",
        160
      );

    const deliveryHeight =
      28 +
      addressLines.length * 5;

    doc.setFillColor(
      248,
      250,
      252
    );

    doc.roundedRect(
      15,
      y,
      180,
      deliveryHeight,
      3,
      3,
      "F"
    );

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    doc.text(
      "DELIVERY INFORMATION",
      20,
      y + 8
    );

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text(
      addressLines,
      20,
      y + 18
    );

    doc.text(
      `Direction: ${
        currentOrder?.address_note ||
        "N/A"
      }`,
      20,
      y + 18 +
        addressLines.length * 5 +
        6
    );

    y += deliveryHeight + 15;

  // =========================
  // ORDER ITEMS
  // =========================

  doc.setFontSize(13);
  doc.setFont(undefined, "bold");

  doc.text("ORDER ITEMS", 15, y);

  y += 8;

  const rowHeight = 8;

  const drawTableHeader = () => {
    doc.setFillColor(249, 115, 22);

    doc.rect(
      15,
      y - 5,
      180,
      8,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(10);

    doc.text("Item", 20, y);

    doc.text("Qty", 125, y);

    doc.text(
      "Price",
      188,
      y,
      {
        align: "right",
      }
    );

    y += 10;

    doc.setTextColor(
      31,
      41,
      55
    );
  };

  drawTableHeader();

  items.forEach((item, index) => {

    // Create new page if we're near bottom
    if (y > 260) {

      doc.addPage();

      y = 20;

      drawTableHeader();
    }

    const itemName =
      item.menu_item_name ||
      item.combo_package_name ||
      "Custom Plate";

    if (index % 2 === 0) {
      doc.setFillColor(
        249,
        250,
        251
      );

      doc.rect(
        15,
        y - 5,
        180,
        8,
        "F"
      );
    }

    doc.text(
      itemName,
      20,
      y
    );

    doc.text(
      String(item.quantity),
      128,
      y
    );

    doc.text(
      `₦${Number(
        item.price
      ).toLocaleString()}`,
      188,
      y,
      {
        align: "right",
      }
    );

    y += rowHeight;
  });

  // Leave a small gap before total
  y += 5;

// Only move TOTAL to another page if there is truly
// not enough room left for TOTAL + FOOTER

if (y > 255) {
  doc.addPage();
  y = 20;
}

    // =========================
    // TOTAL BOX
    // =========================

    doc.setFillColor(
      255,
      247,
      237
    );

    doc.roundedRect(
      120,
      y,
      75,
      15,
      3,
      3,
      "F"
    );

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");

    doc.text(
      "TOTAL",
      128,
      y + 9
    );

    doc.text(
      `₦${Number(
        currentOrder?.total_amount
      ).toLocaleString()}`,
      188,
      y + 9,
      {
        align: "right",
      }
    );

    y += 22;

    // =========================
    // FOOTER
    // =========================

    doc.setDrawColor(220);

    doc.line(
      20,
      y,
      190,
      y
    );

    y += 12;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");

    doc.setTextColor(
      107,
      114,
      128
    );

    doc.text(
      "Thank you for ordering with CampusBites",
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    y += 6;


    y += 6;

    doc.text(
      `Receipt No: ${receiptNumber}`,
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    doc.save(
      `CampusBites-Receipt-${currentOrder?.id}.pdf`
    );
  };
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

      <DialogContent
        dividers
        sx={{
          minHeight: "500px",
          overflowY: "auto",
        }}
      >

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
                display: "block",
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
                  marginBottom: "8px",
                }}
              >
                📞 {currentOrder?.phone}
              </div>

              <div
                style={{
                  color: "#6B7280",
                  marginBottom: "8px",
                  whiteSpace: "pre-line",
                }}
              >
                📍 {currentOrder?.delivery_address}
              </div>

              <div
                style={{
                  color: "#6B7280",
                }}
              >
                📝 {currentOrder?.address_note}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong>Payment:</strong>

                  <StatusBadge
                    status={
                      currentOrder?.payment_status
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <strong>Order:</strong>

                  <StatusBadge
                    status={currentOrder?.status}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions>

        {(
          currentOrder?.status === "Pending" ||
          currentOrder?.status === "Paid"
        ) && (
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

        <Button
          variant="outlined"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>

        <Button onClick={onClose}>
            Close
        </Button>

        </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;