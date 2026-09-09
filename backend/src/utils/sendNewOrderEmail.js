const sendEmail = require("./sendEmail");

const sendNewOrderEmail = async (order) => {
  const itemsHtml = (order.items || [])
    .map(
      (item) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #eee;">
            ${item.item_name || "Item"}
          </td>

          <td style="padding:12px;border-bottom:1px solid #eee;text-align:center;">
            ${item.quantity}
          </td>

          <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;">
            ₦${Number(item.price || 0).toLocaleString()}
          </td>
        </tr>
      `
    )
    .join("");

  await sendEmail(
    order.owner_email,
    `🚨 New Paid Order - ${order.restaurant_name}`,
    `
    <div
      style="
        font-family: Arial, sans-serif;
        background:#f5f7fa;
        padding:30px;
      "
    >

      <div
        style="
          max-width:650px;
          margin:auto;
          background:#ffffff;
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 5px 20px rgba(0,0,0,.08);
        "
      >

        <div
          style="
            background:#ff6b00;
            color:white;
            text-align:center;
            padding:30px;
          "
        >
          <h1 style="margin:0;">
            CampusBites
          </h1>

          <p
        style="
            margin-top:10px;
            font-size:18px;
            font-weight:bold;
        "
        >
        🚨 New Paid Order Waiting For Acceptance
        </p>
        </div>

        <div style="padding:30px;">

          <p>
            Hello <strong>${order.owner_name}</strong>,
          </p>

          <p>
            A customer has successfully placed and paid for
            an order at
            <strong>${order.restaurant_name}</strong>.
          </p>

          <div
            style="
              background:#fff8f3;
              border-left:5px solid #ff6b00;
              padding:15px;
              margin:25px 0;
            "
          >
            <strong>Order ID:</strong>
            #${order.id}

            <br><br>

            <strong>Time:</strong>
            ${new Date().toLocaleString()}
          </div>

          <h3 style="margin-bottom:15px;">
            Ordered Items
          </h3>

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              border-collapse:collapse;
            "
          >
            <thead>
              <tr
                style="
                  background:#f5f5f5;
                "
              >
                <th
                  style="
                    padding:12px;
                    text-align:left;
                  "
                >
                  Item
                </th>

                <th
                  style="
                    padding:12px;
                    text-align:center;
                  "
                >
                  Qty
                </th>

                <th
                  style="
                    padding:12px;
                    text-align:right;
                  "
                >
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div
            style="
                margin-top:25px;
                background:#fffbf7;
                border:2px solid #ff6b00;
                border-radius:12px;
                padding:20px;
                text-align:center;
            "
            >
            <div
                style="
                color:#666;
                font-size:14px;
                margin-bottom:8px;
                "
            >
                TOTAL ORDER VALUE
            </div>

            <div
                style="
                color:#ff6b00;
                font-size:28px;
                font-weight:bold;
                "
            >
                ₦${Number(
                order.total_amount || 0
                ).toLocaleString()}
            </div>
            </div>

          <p style="margin-top:30px;">
            Please log in to your CampusBites
            restaurant dashboard and accept
            this order as soon as possible.
          </p>

        </div>

        <div
          style="
            background:#fafafa;
            padding:20px;
            text-align:center;
            color:#777;
            font-size:12px;
          "
        >
          © ${new Date().getFullYear()} CampusBites

          <br><br>

          Fast food delivery across campus.
        </div>

      </div>
       <div
        style="
            text-align:center;
            margin-top:30px;
        "
        >
        <a
            href="https://campusbites-woad-one.vercel.app/owner"
            style="
            background:#ff6b00;
            color:white;
            text-decoration:none;
            padding:14px 28px;
            border-radius:8px;
            display:inline-block;
            font-weight:bold;
            "
        >
            View Order Dashboard
        </a>
        </div>
    </div>
    `
  );
};

module.exports = sendNewOrderEmail;