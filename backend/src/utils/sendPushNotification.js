require("../config/firebaseAdmin");

const { getMessaging } = require(
  "firebase-admin/messaging"
);

const sendPushNotification = async (
  token,
  title,
  body
) => {
  try {
    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    const response =
      await getMessaging().send(message);

    console.log(
      "✅ Push notification sent:",
      response
    );

    return response;
  } catch (error) {
    console.error(
      "❌ Push notification error:",
      error
    );

    throw error;
  }
};

module.exports = sendPushNotification;