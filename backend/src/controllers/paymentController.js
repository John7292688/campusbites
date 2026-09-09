const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");
const paystack = require("../config/paystack");
const crypto = require("crypto");
const sendNewOrderEmail = require(
  "../utils/sendNewOrderEmail"
);
const sendPushNotification = require(
  "../utils/sendPushNotification"
);

const createPayment = async (req, res) => {
  try {
    const {
      orderId,
      amount,
      paymentMethod,
      transactionReference,
    } = req.body;

    const allowedPaymentMethods = [
      "Paystack",
      "Flutterwave",
      "Cash",
    ];

    if (
      !allowedPaymentMethods.includes(
        paymentMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const payment =
      await paymentService.createPayment(
        orderId,
        amount,
        paymentMethod,
        transactionReference
      );

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create payment",
    });
  }
};

const initializePayment = async (
  req,
  res
) => {
  try {
    const {
      orderId,
      email,
      paymentMethod,
    } = req.body;

    const studentId = req.student.id;

    const allowedPaymentMethods = [
      "Paystack",
      "Flutterwave",
      "Cash",
    ];

    if (
      !allowedPaymentMethods.includes(
        paymentMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const order =
      await orderService.getOrderByIdAndStudent(
        orderId,
        studentId
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const amount = Number(
      order.total_amount
    );

    const response =
      await paystack.post(
        "/transaction/initialize",
        {
          email,
          amount: amount * 100,
          callback_url:
            "https://campusbites-woad-one.vercel.app/payment-success",
        }
      );

    const paystackData =
      response.data.data;

    await paymentService.createPayment(
      orderId,
      amount,
      paymentMethod,
      paystackData.reference
    );

    return res.status(200).json({
      success: true,
      data: paystackData,
    });
  } catch (error) {
    console.error(
      error.response?.data ||
        error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Payment initialization failed",
    });
  }
};

const verifyPayment = async (
  req,
  res
) => {
  try {
    const { reference } = req.params;

    const response =
      await paystack.get(
        `/transaction/verify/${reference}`
      );

    const payment =
      response.data.data;

    if (payment.status === "success") {
      const paymentRecord =
        await paymentService.getPaymentByReference(
          reference
        );

      console.log(
        "REFERENCE:",
        reference
      );

      console.log(
        "PAYMENT RECORD:",
        paymentRecord
      );

      if (
        paymentRecord &&
        paymentRecord.payment_status !==
          "Successful"
      ) {
        await paymentService.updatePaymentStatus(
          reference,
          "Successful"
        );


        const order =
          await orderService.getOrderById(
            paymentRecord.order_id
          );

        console.log(
          "OWNER FCM TOKEN:",
          order.owner_fcm_token
        );  

        if (order.owner_fcm_token) {
          await sendPushNotification(
            order.owner_fcm_token,
            "🍽️ New Order Received",
            `${order.student_name} placed Order #${order.id} worth ₦${order.total_amount}`
          );
        }

        console.log(
          "OWNER EMAIL:",
          order.owner_email
        );

        console.log(
          "OWNER NAME:",
          order.owner_name
        );

        console.log(
          "RESTAURANT:",
          order.restaurant_name
        );

        try {
          await sendNewOrderEmail(
            order
          );

          console.log(
            "✅ EMAIL SENT TO:",
            order.owner_email
          );
          if (order.fcm_token) {
            await sendPushNotification(
              order.fcm_token,
              "New Order Received 🍽️",
              `Order #${order.order_id} has been paid and is ready for processing`
            );

            console.log(
              "✅ PUSH SENT:",
              order.fcm_token
            );
          }
        } catch (error) {
          console.error(
            "❌ EMAIL ERROR:",
            error
          );
        }

        console.log(
          "ORDER UPDATED TO PAID:",
          paymentRecord.order_id
        );
      }
    }

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error(
      error.response?.data ||
        error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Payment verification failed",
    });
  }
};

const paystackWebhook = async (
  req,
  res
) => {
  try {
    const hash = crypto
      .createHmac(
        "sha512",
        process.env.PAYSTACK_SECRET_KEY
      )
      .update(JSON.stringify(req.body))
      .digest("hex");

    const signature =
      req.headers[
        "x-paystack-signature"
      ];

    if (hash !== signature) {
      console.log(
        "INVALID PAYSTACK SIGNATURE"
      );

      return res.sendStatus(401);
    }

    console.log(
      "VALID PAYSTACK WEBHOOK"
    );

    const event = req.body;

    if (
      event.event ===
      "charge.success"
    ) {
      const reference =
        event.data.reference;

      const paymentRecord =
        await paymentService.getPaymentByReference(
          reference
        );

      if (
        paymentRecord &&
        paymentRecord.payment_status !==
          "Successful"
      ) {
        await paymentService.updatePaymentStatus(
          reference,
          "Successful"
        );

        const order =
          await orderService.getOrderById(
            paymentRecord.order_ido
          );

        console.log(
          "OWNER FCM TOKEN:",
          order.owner_fcm_token
        );  

        if (order.owner_fcm_token) {
          await sendPushNotification(
            order.owner_fcm_token,
            "🍽️ New Order Received",
            `${order.student_name} placed Order #${order.id} worth ₦${order.total_amount}`
          );
        }         

        console.log(
          "OWNER EMAIL:",
          order.owner_email
        );

        console.log(
          "OWNER NAME:",
          order.owner_name
        );

        console.log(
          "RESTAURANT:",
          order.restaurant_name
        );

        try {
          await sendNewOrderEmail(
            order
          );

          console.log(
            "✅ EMAIL SENT TO:",
            order.owner_email
          );
          if (order.fcm_token) {
            await sendPushNotification(
              order.fcm_token,
              "New Order Received 🍽️",
              `Order #${order.order_id} has been paid and is ready for processing`
            );

            console.log(
              "✅ PUSH SENT:",
              order.fcm_token
            );
          }
        } catch (error) {
          console.error(
            "❌ EMAIL ERROR:",
            error
          );
        }

        console.log(
          "ORDER UPDATED TO PAID:",
          paymentRecord.order_id
        );
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};

module.exports = {
  createPayment,
  initializePayment,
  verifyPayment,
  paystackWebhook,
};