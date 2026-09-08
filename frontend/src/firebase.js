import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCf-Yi_XU5jINVZnA4rBhk9LEFMgMonhbM",
  authDomain: "campusbites-34eb1.firebaseapp.com",
  projectId: "campusbites-34eb1",
  storageBucket: "campusbites-34eb1.firebasestorage.app",
  messagingSenderId: "132614152120",
  appId: "1:132614152120:web:37245ac00e1c050d87794d",
  measurementId: "G-JLS4PETZ6K",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const requestNotificationPermission =
  async () => {
    try {
      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        console.log(
          "Notification permission denied"
        );
        return null;
      }

      const token = await getToken(
        messaging,
        {
          vapidKey:
            "BL6hAsBoyMXZ2ZXUQHbddwxUBNJRWPZet1xAejZOmcaNS6QN8UDA8yqJxAIty3IEZLZQEajYZccNUdbR_1JiKAg",
        }
      );

      console.log(
        "FCM TOKEN:",
        token
      );

      return token;
    } catch (error) {
      console.error(
        "FCM ERROR:",
        error
      );

      return null;
    }
  };

export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log(
      "Foreground notification:",
      payload
    );

    new Notification(
      payload.notification.title,
      {
        body: payload.notification.body,
        icon: "/favicon.ico",
      }
    );
  });
};